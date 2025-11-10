import SwiftUI

struct AlbumPlaybackAreaView: View {
    let albumCover: String
    let songTitle: String
    let artist: String
    let currentTime: TimeInterval
    let duration: TimeInterval
    let isPlaying: Bool
    let listenersCount: Int
    let songs: [Song]
    let currentIndex: Int
    let onProgressChange: (TimeInterval) -> Void
    let onPlayPause: () -> Void
    let onPrevious: () -> Void
    let onNext: () -> Void
    let onPlaylistOpen: () -> Void

    @State private var rotation: Double = 0

    var body: some View {
        VStack(spacing: 0) {
            // 3D Card Stack
            ZStack {
                ForEach(Array(songs.dropFirst(currentIndex).prefix(4).enumerated()), id: \.element.id) { index, song in
                    let isCurrentCard = index == 0

                    AsyncImage(url: URL(string: song.albumCover)) { image in
                        image
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                    } placeholder: {
                        Color.gray
                    }
                    .frame(width: 220, height: 220)
                    .cornerRadius(16)
                    .overlay(
                        RoundedRectangle(cornerRadius: 16)
                            .stroke(isCurrentCard ? Color(hex: "#34C759") : Color.white.opacity(0.1), lineWidth: isCurrentCard ? 2 : 1)
                    )
                    .overlay(
                        isCurrentCard ? nil : Color.black.opacity(0.5)
                    )
                    .shadow(color: isCurrentCard ? Color(hex: "#34C759").opacity(0.4) : Color.black.opacity(0.7), radius: isCurrentCard ? 25 : 15 + CGFloat(index * 5), x: 0, y: isCurrentCard ? 25 : 15 + CGFloat(index * 5))
                    .scaleEffect(isCurrentCard ? 1.0 : 0.85 - Double(index) * 0.08)
                    .offset(
                        x: isCurrentCard ? 0 : CGFloat(index * 20),
                        y: isCurrentCard ? 0 : CGFloat(index * 25)
                    )
                    .rotation3DEffect(
                        .degrees(isCurrentCard ? (isPlaying ? rotation : 0) : Double(index) * -2),
                        axis: (x: 0, y: 1, z: 0),
                        perspective: 0.7
                    )
                    .rotationEffect(.degrees(isCurrentCard ? 0 : Double(index) * 3))
                    .zIndex(Double(20 - index))
                    .animation(isPlaying && isCurrentCard ? Animation.easeInOut(duration: 4).repeatForever(autoreverses: true) : .default, value: rotation)
                }
            }
            .frame(height: 260)
            .padding(.top, 60)
            .onAppear {
                if isPlaying {
                    withAnimation {
                        rotation = 5
                    }
                }
            }
            .onChange(of: isPlaying) { newValue in
                withAnimation {
                    rotation = newValue ? 5 : 0
                }
            }

            // Song Information
            VStack(spacing: 8) {
                Text(songTitle)
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundColor(.white)
                    .lineLimit(2)
                    .multilineTextAlignment(.center)

                Text(artist)
                    .font(.system(size: 15))
                    .foregroundColor(Color(hex: "#999999"))
            }
            .frame(maxWidth: 280)
            .padding(.top, 30)

            // Progress Bar
            VStack(spacing: 8) {
                Slider(value: Binding(
                    get: { currentTime },
                    set: { onProgressChange($0) }
                ), in: 0...duration)
                .accentColor(Color(hex: "#34C759"))
                .frame(width: 280)

                // Time Display
                HStack {
                    Text(formatTime(currentTime))
                    Spacer()
                    Text(formatTime(duration))
                }
                .font(.system(size: 13))
                .foregroundColor(Color(hex: "#999999"))
                .frame(width: 280)
            }
            .padding(.top, 15)

            // Playback Controls
            HStack(spacing: 30) {
                Button(action: onPrevious) {
                    Image(systemName: "backward.fill")
                        .font(.system(size: 24))
                        .foregroundColor(Color(hex: "#999999"))
                }

                Button(action: onPlayPause) {
                    Image(systemName: isPlaying ? "pause.fill" : "play.fill")
                        .font(.system(size: 24))
                        .foregroundColor(Color(hex: "#999999"))
                }

                Button(action: onNext) {
                    Image(systemName: "forward.fill")
                        .font(.system(size: 24))
                        .foregroundColor(Color(hex: "#999999"))
                }

                Button(action: onPlaylistOpen) {
                    Image(systemName: "line.3.horizontal")
                        .font(.system(size: 24))
                        .foregroundColor(Color(hex: "#999999"))
                }
            }
            .padding(.top, 32)
        }
        .padding(.horizontal, 20)
    }

    private func formatTime(_ seconds: TimeInterval) -> String {
        let mins = Int(seconds) / 60
        let secs = Int(seconds) % 60
        return String(format: "%02d:%02d", mins, secs)
    }
}
