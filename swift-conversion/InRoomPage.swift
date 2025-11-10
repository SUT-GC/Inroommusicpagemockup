import SwiftUI

struct InRoomPage: View {
    @StateObject private var viewModel: InRoomViewModel
    @Environment(\.dismiss) private var dismiss
    @State private var dragOffset: CGFloat = 0

    let onBack: () -> Void

    init(roomId: String, roomName: String, songs: [Song], members: [Member], onBack: @escaping () -> Void) {
        _viewModel = StateObject(wrappedValue: InRoomViewModel(
            roomId: roomId,
            roomName: roomName,
            songs: songs,
            members: members
        ))
        self.onBack = onBack
    }

    var body: some View {
        ZStack {
            Color(hex: "#1E1E1E")
                .ignoresSafeArea()

            VStack(spacing: 0) {
                // Top Navigation
                TopNavigationView(
                    roomName: viewModel.roomName,
                    currentPage: viewModel.currentPage,
                    unreadChatCount: viewModel.unreadChatCount,
                    onBack: { viewModel.showExitConfirm = true },
                    onShare: { },
                    onReport: { },
                    onExit: { viewModel.showExitConfirm = true },
                    onChat: { viewModel.switchToPage(1) },
                    onSettings: { viewModel.showSettings = true }
                )

                // Page Indicator
                PageIndicatorView(currentPage: viewModel.currentPage)
                    .padding(.vertical, 12)

                // Swipeable Pages
                GeometryReader { geometry in
                    HStack(spacing: 0) {
                        // Music Page
                        MusicPageView(viewModel: viewModel)
                            .frame(width: geometry.size.width)

                        // Chat Page
                        RoomChatContentView()
                            .frame(width: geometry.size.width)
                    }
                    .offset(x: -CGFloat(viewModel.currentPage) * geometry.size.width + dragOffset)
                    .gesture(
                        DragGesture()
                            .onChanged { value in
                                dragOffset = value.translation.width
                            }
                            .onEnded { value in
                                let threshold: CGFloat = 50
                                let velocity = value.predictedEndLocation.x - value.location.x

                                var targetPage = viewModel.currentPage

                                if abs(velocity) > 500 {
                                    targetPage = velocity > 0 ? max(0, viewModel.currentPage - 1) : min(1, viewModel.currentPage + 1)
                                } else if abs(value.translation.width) > threshold {
                                    targetPage = value.translation.width > 0 ? max(0, viewModel.currentPage - 1) : min(1, viewModel.currentPage + 1)
                                }

                                withAnimation(.spring(response: 0.3, dampingFraction: 0.8)) {
                                    viewModel.switchToPage(targetPage)
                                    dragOffset = 0
                                }
                            }
                    )
                    .animation(.spring(response: 0.3, dampingFraction: 0.8), value: viewModel.currentPage)
                }
            }
        }
        .sheet(isPresented: $viewModel.showSettings) {
            SettingsDialogView(
                roomName: $viewModel.roomName,
                creatorOnlyMode: $viewModel.creatorOnlyMode,
                isPrivate: $viewModel.isPrivate
            )
        }
        .sheet(isPresented: $viewModel.showInvite) {
            InviteDialogView(
                roomName: viewModel.roomName,
                roomLink: "https://listentogether.app/room/\(viewModel.roomId)"
            )
        }
        .sheet(isPresented: $viewModel.showPlaylist) {
            PlaylistSheetView(
                songs: $viewModel.songs,
                currentSongIndex: viewModel.currentSongIndex,
                onSongSelect: { index in
                    viewModel.handleSongSelect(index: index)
                    viewModel.showPlaylist = false
                },
                onAddSong: { song in
                    viewModel.handleAddSong(newSong: song)
                },
                onDeleteSong: { index in
                    viewModel.handleDeleteSong(at: index)
                },
                onPinSong: { index in
                    viewModel.handlePinSong(at: index)
                }
            )
        }
        .alert("Exit Room?", isPresented: $viewModel.showExitConfirm) {
            Button("Cancel", role: .cancel) { }
            Button("Exit", role: .destructive) {
                onBack()
            }
        } message: {
            Text("Are you sure you want to leave \"\(viewModel.roomName)\"? You can always rejoin later.")
        }
    }
}

// MARK: - Page Indicator

struct PageIndicatorView: View {
    let currentPage: Int

    var body: some View {
        HStack(spacing: 8) {
            Capsule()
                .fill(currentPage == 0 ? Color(hex: "#34C759") : Color(hex: "#666666"))
                .frame(width: currentPage == 0 ? 20 : 8, height: 8)

            Capsule()
                .fill(currentPage == 1 ? Color(hex: "#34C759") : Color(hex: "#666666"))
                .frame(width: currentPage == 1 ? 20 : 8, height: 8)
        }
        .animation(.easeInOut(duration: 0.3), value: currentPage)
    }
}

// MARK: - Music Page

struct MusicPageView: View {
    @ObservedObject var viewModel: InRoomViewModel

    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Album Playback Area
                AlbumPlaybackAreaView(
                    albumCover: viewModel.currentSong.albumCover,
                    songTitle: viewModel.currentSong.title,
                    artist: viewModel.currentSong.artist,
                    currentTime: viewModel.currentTime,
                    duration: viewModel.currentSong.duration,
                    isPlaying: viewModel.isPlaying,
                    listenersCount: viewModel.members.count,
                    songs: viewModel.songs,
                    currentIndex: viewModel.currentSongIndex,
                    onProgressChange: { value in
                        viewModel.handleProgressChange(value: value)
                    },
                    onPlayPause: {
                        viewModel.handlePlayPause()
                    },
                    onPrevious: {
                        viewModel.handlePrevious()
                    },
                    onNext: {
                        viewModel.handleNext()
                    },
                    onPlaylistOpen: {
                        viewModel.showPlaylist = true
                    }
                )

                // Room Members Area
                RoomMembersAreaView(
                    members: viewModel.members,
                    realtimeMessage: viewModel.realtimeMessage,
                    onInvite: {
                        viewModel.showInvite = true
                    }
                )
                .padding(.top, 24)
            }
            .padding(.bottom, 34)
        }
    }
}
