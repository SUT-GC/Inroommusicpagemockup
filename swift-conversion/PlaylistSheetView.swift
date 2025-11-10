import SwiftUI

struct PlaylistSheetView: View {
    @Binding var songs: [Song]
    let currentSongIndex: Int
    let onSongSelect: (Int) -> Void
    let onAddSong: (Song) -> Void
    let onDeleteSong: (Int) -> Void
    let onPinSong: (Int) -> Void

    @State private var showSearchDialog = false
    @State private var searchQuery = ""
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationView {
            ZStack {
                Color(hex: "#1E1E1E")
                    .ignoresSafeArea()

                ScrollView {
                    LazyVStack(spacing: 8) {
                        ForEach(Array(songs.enumerated()), id: \.element.id) { index, song in
                            let isCurrentSong = index == currentSongIndex

                            HStack(spacing: 12) {
                                // Album Cover with play indicator
                                ZStack {
                                    AsyncImage(url: URL(string: song.albumCover)) { image in
                                        image
                                            .resizable()
                                            .aspectRatio(contentMode: .fill)
                                    } placeholder: {
                                        Color.gray
                                    }
                                    .frame(width: 48, height: 48)
                                    .cornerRadius(8)

                                    if isCurrentSong {
                                        Color.black.opacity(0.4)
                                            .frame(width: 48, height: 48)
                                            .cornerRadius(8)

                                        Image(systemName: "play.fill")
                                            .font(.system(size: 16))
                                            .foregroundColor(Color(hex: "#34C759"))
                                    }
                                }

                                // Song Info
                                VStack(alignment: .leading, spacing: 4) {
                                    Text(song.title)
                                        .font(.system(size: 15))
                                        .foregroundColor(isCurrentSong ? Color(hex: "#34C759") : .white)
                                        .lineLimit(1)

                                    Text(song.artist)
                                        .font(.system(size: 13))
                                        .foregroundColor(Color(hex: "#999999"))
                                        .lineLimit(1)
                                }

                                Spacer()

                                // Action Buttons
                                HStack(spacing: 8) {
                                    // Pin Button
                                    if index != 0 {
                                        Button(action: {
                                            onPinSong(index)
                                        }) {
                                            Image(systemName: "arrow.up.to.line")
                                                .font(.system(size: 14))
                                                .foregroundColor(Color(hex: "#34C759"))
                                                .frame(width: 32, height: 32)
                                                .background(Color(hex: "#3C3C3C"))
                                                .cornerRadius(8)
                                        }
                                    }

                                    // Delete Button
                                    if songs.count > 1 {
                                        Button(action: {
                                            onDeleteSong(index)
                                        }) {
                                            Image(systemName: "trash")
                                                .font(.system(size: 14))
                                                .foregroundColor(Color(hex: "#FF3B30"))
                                                .frame(width: 32, height: 32)
                                                .background(Color(hex: "#3C3C3C"))
                                                .cornerRadius(8)
                                        }
                                    }
                                }
                            }
                            .padding(12)
                            .background(
                                isCurrentSong ?
                                    Color(hex: "#34C759").opacity(0.1) :
                                    Color(hex: "#2C2C2C")
                            )
                            .overlay(
                                RoundedRectangle(cornerRadius: 12)
                                    .stroke(isCurrentSong ? Color(hex: "#34C759").opacity(0.3) : Color.clear, lineWidth: 1)
                            )
                            .cornerRadius(12)
                            .onTapGesture {
                                onSongSelect(index)
                            }
                        }
                    }
                    .padding(20)
                }
            }
            .navigationTitle("Playlist (\(songs.count) songs)")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: {
                        showSearchDialog = true
                    }) {
                        Image(systemName: "plus.circle.fill")
                            .font(.system(size: 24))
                            .foregroundColor(Color(hex: "#34C759"))
                    }
                }
            }
        }
        .sheet(isPresented: $showSearchDialog) {
            SearchSongsDialogView(
                searchQuery: $searchQuery,
                onAddSong: { song in
                    onAddSong(song)
                    showSearchDialog = false
                    searchQuery = ""
                }
            )
        }
    }
}

// MARK: - Search Songs Dialog

struct SearchSongsDialogView: View {
    @Binding var searchQuery: String
    let onAddSong: (Song) -> Void
    @Environment(\.dismiss) private var dismiss

    // Mock search database
    private let mockSongs: [Song] = [
        Song(id: 101, title: "Blinding Lights", artist: "The Weeknd", duration: 200, albumCover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400", lyrics: []),
        Song(id: 102, title: "Shape of You", artist: "Ed Sheeran", duration: 234, albumCover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400", lyrics: []),
        Song(id: 103, title: "Levitating", artist: "Dua Lipa", duration: 203, albumCover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400", lyrics: []),
        Song(id: 104, title: "Watermelon Sugar", artist: "Harry Styles", duration: 174, albumCover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400", lyrics: []),
        Song(id: 105, title: "Good 4 U", artist: "Olivia Rodrigo", duration: 178, albumCover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400", lyrics: []),
    ]

    private var searchResults: [Song] {
        if searchQuery.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty {
            return mockSongs
        }
        return mockSongs.filter {
            $0.title.localizedCaseInsensitiveContains(searchQuery) ||
            $0.artist.localizedCaseInsensitiveContains(searchQuery)
        }
    }

    var body: some View {
        NavigationView {
            ZStack {
                Color(hex: "#1E1E1E")
                    .ignoresSafeArea()

                VStack(spacing: 0) {
                    // Search Bar
                    HStack {
                        Image(systemName: "magnifyingglass")
                            .foregroundColor(Color(hex: "#999999"))

                        TextField("Search by song or artist...", text: $searchQuery)
                            .foregroundColor(.white)
                    }
                    .padding()
                    .background(Color(hex: "#2C2C2C"))
                    .cornerRadius(12)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color(hex: "#3C3C3C"), lineWidth: 1)
                    )
                    .padding()

                    // Search Results
                    ScrollView {
                        LazyVStack(spacing: 8) {
                            if searchResults.isEmpty {
                                Text("No songs found")
                                    .foregroundColor(Color(hex: "#999999"))
                                    .padding(.top, 32)
                            } else {
                                ForEach(searchResults) { song in
                                    Button(action: {
                                        onAddSong(song)
                                    }) {
                                        HStack(spacing: 12) {
                                            AsyncImage(url: URL(string: song.albumCover)) { image in
                                                image
                                                    .resizable()
                                                    .aspectRatio(contentMode: .fill)
                                            } placeholder: {
                                                Color.gray
                                            }
                                            .frame(width: 48, height: 48)
                                            .cornerRadius(8)

                                            VStack(alignment: .leading, spacing: 4) {
                                                Text(song.title)
                                                    .font(.system(size: 15))
                                                    .foregroundColor(.white)
                                                    .lineLimit(1)

                                                Text(song.artist)
                                                    .font(.system(size: 13))
                                                    .foregroundColor(Color(hex: "#999999"))
                                                    .lineLimit(1)
                                            }

                                            Spacer()

                                            Text(formatTime(song.duration))
                                                .font(.system(size: 13))
                                                .foregroundColor(Color(hex: "#999999"))

                                            Image(systemName: "plus")
                                                .foregroundColor(Color(hex: "#34C759"))
                                        }
                                        .padding(12)
                                        .background(Color(hex: "#2C2C2C"))
                                        .cornerRadius(12)
                                    }
                                }
                            }
                        }
                        .padding(.horizontal, 20)
                    }
                }
            }
            .navigationTitle("Search Songs")
            .navigationBarTitleDisplayMode(.inline)
        }
    }

    private func formatTime(_ seconds: TimeInterval) -> String {
        let mins = Int(seconds) / 60
        let secs = Int(seconds) % 60
        return "\(mins):\(String(format: "%02d", secs))"
    }
}
