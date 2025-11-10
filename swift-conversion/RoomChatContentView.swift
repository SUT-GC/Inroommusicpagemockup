import SwiftUI

struct RoomChatContentView: View {
    @State private var messages: [RoomChatMessage] = mockMessages
    @State private var inputValue: String = ""

    var body: some View {
        VStack(spacing: 0) {
            // Messages Area
            ScrollViewReader { proxy in
                ScrollView {
                    LazyVStack(spacing: 16) {
                        ForEach(Array(messages.enumerated()), id: \.element.id) { index, message in
                            let showAvatar = index == 0 || messages[index - 1].senderId != message.senderId

                            MessageBubbleView(
                                message: message,
                                showAvatar: showAvatar
                            )
                            .id(message.id)
                        }
                    }
                    .padding(.horizontal, 20)
                    .padding(.vertical, 20)
                }
                .onChange(of: messages.count) { _ in
                    if let lastMessage = messages.last {
                        withAnimation {
                            proxy.scrollTo(lastMessage.id, anchor: .bottom)
                        }
                    }
                }
            }

            // Input Area
            HStack(spacing: 8) {
                TextField("Message...", text: $inputValue)
                    .padding(.horizontal, 16)
                    .padding(.vertical, 10)
                    .background(Color(hex: "#2C2C2C"))
                    .foregroundColor(.white)
                    .cornerRadius(20)
                    .onSubmit {
                        sendMessage()
                    }

                Button(action: sendMessage) {
                    Image(systemName: "arrow.up")
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.white)
                        .frame(width: 40, height: 40)
                        .background(
                            Circle()
                                .fill(inputValue.isEmpty ? Color(hex: "#34C759").opacity(0.4) : Color(hex: "#34C759"))
                        )
                }
                .disabled(inputValue.isEmpty)
            }
            .padding(.horizontal, 20)
            .padding(.top, 16)
            .padding(.bottom, 88)
            .background(Color(hex: "#1E1E1E"))
            .overlay(
                Rectangle()
                    .fill(Color(hex: "#2C2C2C"))
                    .frame(height: 1),
                alignment: .top
            )
        }
        .background(Color(hex: "#1E1E1E"))
    }

    private func sendMessage() {
        guard !inputValue.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return }

        let newMessage = RoomChatMessage(
            id: UUID().uuidString,
            text: inputValue,
            senderId: "me",
            senderName: "You",
            senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
            timestamp: formatTime(Date()),
            isMe: true
        )

        messages.append(newMessage)
        inputValue = ""
    }

    private func formatTime(_ date: Date) -> String {
        let formatter = DateFormatter()
        formatter.timeStyle = .short
        return formatter.string(from: date)
    }
}

struct MessageBubbleView: View {
    let message: RoomChatMessage
    let showAvatar: Bool

    var body: some View {
        HStack(alignment: .bottom, spacing: 8) {
            if message.isMe {
                Spacer()
            }

            // Avatar
            if !message.isMe {
                if showAvatar {
                    AsyncImage(url: URL(string: message.senderAvatar)) { image in
                        image
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                    } placeholder: {
                        Circle()
                            .fill(Color(hex: "#333333"))
                            .overlay(
                                Text(String(message.senderName.prefix(1)))
                                    .foregroundColor(.white)
                            )
                    }
                    .frame(width: 32, height: 32)
                    .clipShape(Circle())
                } else {
                    Color.clear
                        .frame(width: 32, height: 32)
                }
            }

            // Message Content
            VStack(alignment: message.isMe ? .trailing : .leading, spacing: 4) {
                if !message.isMe && showAvatar {
                    Text(message.senderName)
                        .font(.system(size: 12))
                        .foregroundColor(Color(hex: "#999999"))
                        .padding(.horizontal, 12)
                }

                Text(message.text)
                    .font(.system(size: 15))
                    .foregroundColor(.white)
                    .padding(.horizontal, 16)
                    .padding(.vertical, 10)
                    .background(
                        message.isMe ? Color(hex: "#34C759") : Color(hex: "#2C2C2C")
                    )
                    .cornerRadius(18)

                Text(message.timestamp)
                    .font(.system(size: 11))
                    .foregroundColor(Color(hex: "#666666"))
                    .padding(.horizontal, 12)
            }
            .frame(maxWidth: UIScreen.main.bounds.width * 0.75, alignment: message.isMe ? .trailing : .leading)

            if message.isMe {
                Color.clear
                    .frame(width: 32, height: 32)
            }

            if !message.isMe {
                Spacer()
            }
        }
        .transition(.opacity.combined(with: .move(edge: .bottom)))
    }
}

// MARK: - Mock Data

private let mockMessages: [RoomChatMessage] = [
    RoomChatMessage(id: "1", text: "Hey everyone! Love this song 🎵", senderId: "user1", senderName: "Alice", senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice", timestamp: "10:30 AM", isMe: false),
    RoomChatMessage(id: "2", text: "Same here! The beat is amazing 🔥", senderId: "me", senderName: "You", senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You", timestamp: "10:31 AM", isMe: true),
    RoomChatMessage(id: "3", text: "Can we play that other song next?", senderId: "user2", senderName: "Bob", senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob", timestamp: "10:32 AM", isMe: false),
    RoomChatMessage(id: "4", text: "Sure! Let me add it to the queue", senderId: "user1", senderName: "Alice", senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice", timestamp: "10:33 AM", isMe: false),
    RoomChatMessage(id: "5", text: "This is so much fun! 🎉", senderId: "user3", senderName: "Charlie", senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie", timestamp: "10:34 AM", isMe: false),
]
