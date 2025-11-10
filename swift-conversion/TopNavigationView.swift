import SwiftUI

struct TopNavigationView: View {
    let roomName: String
    let currentPage: Int
    let unreadChatCount: Int
    let onBack: () -> Void
    let onShare: () -> Void
    let onReport: () -> Void
    let onExit: () -> Void
    let onChat: () -> Void
    let onSettings: () -> Void

    @State private var showMenu = false

    var body: some View {
        HStack {
            // Back Button
            Button(action: onBack) {
                Image(systemName: "arrow.left")
                    .font(.system(size: 20, weight: .medium))
                    .foregroundColor(.white)
                    .frame(width: 24, height: 24)
            }

            Spacer()

            // Room Name (with marquee for long names)
            Text(roomName)
                .font(.system(size: 17, weight: .semibold))
                .foregroundColor(.white)
                .lineLimit(1)
                .frame(maxWidth: 180)

            Spacer()

            // More Menu
            Menu {
                if currentPage == 0 {
                    Button(action: onSettings) {
                        Label("Room Settings", systemImage: "gear")
                    }
                }

                Button(action: onShare) {
                    Label("Share Room", systemImage: "square.and.arrow.up")
                }

                Button(action: onReport) {
                    Label("Report Room", systemImage: "exclamationmark.triangle")
                }

                Button(action: onExit) {
                    Label("Exit Room", systemImage: "rectangle.portrait.and.arrow.right")
                }
            } label: {
                Image(systemName: "ellipsis")
                    .font(.system(size: 20, weight: .medium))
                    .foregroundColor(.white)
                    .frame(width: 24, height: 24)
                    .rotationEffect(.degrees(90))
            }
        }
        .padding(.horizontal, 20)
        .frame(height: 44)
        .background(Color(hex: "#1E1E1E"))
    }
}
