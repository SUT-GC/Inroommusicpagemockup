import Foundation
import SwiftUI

// MARK: - Data Models

struct Song: Identifiable, Equatable {
    let id: Int
    let title: String
    let artist: String
    let duration: TimeInterval
    let albumCover: String
    let lyrics: [String]

    static func == (lhs: Song, rhs: Song) -> Bool {
        lhs.id == rhs.id
    }
}

struct Member: Identifiable {
    let id: String
    let name: String
    let avatar: String
    let isCreator: Bool
}

struct RoomChatMessage: Identifiable {
    let id: String
    let text: String
    let senderId: String
    let senderName: String
    let senderAvatar: String
    let timestamp: String
    let isMe: Bool
}

// MARK: - View Models

class InRoomViewModel: ObservableObject {
    @Published var songs: [Song]
    @Published var currentSongIndex: Int = 0
    @Published var isPlaying: Bool = true
    @Published var currentTime: TimeInterval = 0
    @Published var roomName: String
    @Published var creatorOnlyMode: Bool = false
    @Published var isPrivate: Bool = false
    @Published var currentPage: Int = 0 // 0 = Music, 1 = Chat
    @Published var unreadChatCount: Int = 5
    @Published var realtimeMessage: String = ""

    // Dialog states
    @Published var showSettings: Bool = false
    @Published var showInvite: Bool = false
    @Published var showExitConfirm: Bool = false
    @Published var showPlaylist: Bool = false

    let members: [Member]
    let roomId: String

    private var playbackTimer: Timer?

    var currentSong: Song {
        songs[currentSongIndex]
    }

    init(roomId: String, roomName: String, songs: [Song], members: [Member]) {
        self.roomId = roomId
        self.roomName = roomName
        self.songs = songs
        self.members = members
        startPlaybackTimer()
    }

    deinit {
        playbackTimer?.invalidate()
    }

    // MARK: - Playback Control

    private func startPlaybackTimer() {
        playbackTimer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { [weak self] _ in
            guard let self = self, self.isPlaying else { return }

            if self.currentTime >= self.currentSong.duration {
                self.handleNext()
            } else {
                self.currentTime += 1
            }
        }
    }

    func handlePlayPause() {
        isPlaying.toggle()
    }

    func handlePrevious() {
        let newIndex = currentSongIndex > 0 ? currentSongIndex - 1 : songs.count - 1
        currentSongIndex = newIndex
        currentTime = 0
        realtimeMessage = "User A is switching songs"
    }

    func handleNext() {
        let newIndex = currentSongIndex < songs.count - 1 ? currentSongIndex + 1 : 0
        currentSongIndex = newIndex
        currentTime = 0
        realtimeMessage = "User A is switching songs"
    }

    func handleProgressChange(value: TimeInterval) {
        currentTime = value
    }

    // MARK: - Song Management

    func handleSongSelect(index: Int) {
        currentSongIndex = index
        currentTime = 0
        realtimeMessage = "User A is switching songs"
    }

    func handleAddSong(newSong: Song) {
        songs.append(newSong)
    }

    func handleDeleteSong(at index: Int) {
        guard songs.count > 1 else { return }

        songs.remove(at: index)

        if index == currentSongIndex {
            currentSongIndex = index >= songs.count ? songs.count - 1 : index
            currentTime = 0
        } else if index < currentSongIndex {
            currentSongIndex -= 1
        }
    }

    func handlePinSong(at index: Int) {
        guard index != 0 else { return }

        let pinnedSong = songs[index]
        songs.remove(at: index)
        songs.insert(pinnedSong, at: 0)

        currentSongIndex = 0
        currentTime = 0
        isPlaying = true
    }

    // MARK: - Page Navigation

    func switchToPage(_ pageIndex: Int) {
        currentPage = pageIndex
        if pageIndex == 1 {
            unreadChatCount = 0
        }
    }

    // MARK: - Helpers

    func formatTime(_ seconds: TimeInterval) -> String {
        let mins = Int(seconds) / 60
        let secs = Int(seconds) % 60
        return String(format: "%02d:%02d", mins, secs)
    }
}
