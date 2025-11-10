import SwiftUI

// MARK: - Settings Dialog

struct SettingsDialogView: View {
    @Binding var roomName: String
    @Binding var creatorOnlyMode: Bool
    @Binding var isPrivate: Bool
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationView {
            VStack(spacing: 24) {
                // Room Name
                VStack(alignment: .leading, spacing: 8) {
                    Text("Room Name")
                        .font(.system(size: 15))
                        .foregroundColor(.white)

                    TextField("Room Name", text: $roomName)
                        .padding()
                        .background(Color(hex: "#1E1E1E"))
                        .foregroundColor(.white)
                        .cornerRadius(8)
                        .overlay(
                            RoundedRectangle(cornerRadius: 8)
                                .stroke(Color(hex: "#3C3C3C"), lineWidth: 1)
                        )
                }

                // Private Room Toggle
                HStack {
                    Text("Private Room")
                        .font(.system(size: 15))
                        .foregroundColor(.white)

                    Spacer()

                    Toggle("", isOn: $isPrivate)
                        .labelsHidden()
                        .tint(Color(hex: "#34C759"))
                }

                // Creator Only Mode Toggle
                HStack {
                    Text("Only Creator Can Switch Songs")
                        .font(.system(size: 15))
                        .foregroundColor(.white)

                    Spacer()

                    Toggle("", isOn: $creatorOnlyMode)
                        .labelsHidden()
                        .tint(Color(hex: "#34C759"))
                }

                // Done Button
                Button(action: { dismiss() }) {
                    Text("Done")
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color(hex: "#34C759"))
                        .cornerRadius(12)
                }

                Spacer()
            }
            .padding(24)
            .background(Color(hex: "#2C2C2C"))
            .navigationTitle("Room Settings")
            .navigationBarTitleDisplayMode(.inline)
        }
        .presentationDetents([.medium])
    }
}

// MARK: - Invite Dialog

struct InviteDialogView: View {
    let roomName: String
    let roomLink: String
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        VStack(spacing: 16) {
            Text("Invite to \(roomName)")
                .font(.system(size: 20, weight: .bold))
                .foregroundColor(.white)
                .padding(.top, 24)

            VStack(spacing: 12) {
                Button(action: {
                    // Share via WeChat
                }) {
                    HStack {
                        Image(systemName: "square.and.arrow.up")
                        Text("Share via WeChat")
                    }
                    .font(.system(size: 16))
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color(hex: "#1E1E1E"))
                    .cornerRadius(12)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color(hex: "#3C3C3C"), lineWidth: 1)
                    )
                }

                Button(action: {
                    // Share via QQ
                }) {
                    HStack {
                        Image(systemName: "square.and.arrow.up")
                        Text("Share via QQ")
                    }
                    .font(.system(size: 16))
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color(hex: "#1E1E1E"))
                    .cornerRadius(12)
                    .overlay(
                        RoundedRectangle(cornerRadius: 12)
                            .stroke(Color(hex: "#3C3C3C"), lineWidth: 1)
                    )
                }

                Button(action: {
                    UIPasteboard.general.string = roomLink
                    // Show toast: "Link copied to clipboard!"
                    dismiss()
                }) {
                    HStack {
                        Image(systemName: "doc.on.doc")
                        Text("Copy Link")
                    }
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color(hex: "#34C759"))
                    .cornerRadius(12)
                }
            }
            .padding(.horizontal, 24)
            .padding(.bottom, 24)
        }
        .frame(maxWidth: 260)
        .background(Color(hex: "#2C2C2C"))
        .cornerRadius(20)
        .presentationDetents([.height(280)])
    }
}

// MARK: - User Info Sheet

struct UserInfoSheetView: View {
    let userName: String
    let userAvatar: String
    let listeningHours: Int
    let isFriend: Bool
    let onSendMessage: () -> Void
    let onAddFriend: () -> Void
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        VStack(spacing: 24) {
            // User Avatar and Info
            VStack(spacing: 16) {
                ZStack(alignment: .topTrailing) {
                    AsyncImage(url: URL(string: userAvatar)) { image in
                        image
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                    } placeholder: {
                        Circle()
                            .fill(Color(hex: "#34C759"))
                            .overlay(
                                Text(String(userName.prefix(1)))
                                    .font(.system(size: 32, weight: .bold))
                                    .foregroundColor(.white)
                            )
                    }
                    .frame(width: 96, height: 96)
                    .clipShape(Circle())

                    // Online indicator
                    Circle()
                        .fill(Color(hex: "#34C759"))
                        .frame(width: 20, height: 20)
                        .overlay(
                            Circle()
                                .stroke(Color(hex: "#2C2C2C"), lineWidth: 3)
                        )
                        .offset(x: 4, y: 4)
                }

                Text(userName)
                    .font(.system(size: 24, weight: .bold))
                    .foregroundColor(.white)
            }
            .padding(.top, 16)

            // Stats Card
            HStack(spacing: 12) {
                Circle()
                    .fill(Color(hex: "#34C759").opacity(0.2))
                    .frame(width: 48, height: 48)
                    .overlay(
                        Image(systemName: "music.note")
                            .font(.system(size: 20))
                            .foregroundColor(Color(hex: "#34C759"))
                    )

                VStack(alignment: .leading, spacing: 2) {
                    Text("Listened together")
                        .font(.system(size: 13))
                        .foregroundColor(Color(hex: "#8E8E93"))

                    Text("\(listeningHours) hours")
                        .font(.system(size: 20, weight: .semibold))
                        .foregroundColor(.white)
                }

                Spacer()
            }
            .padding()
            .background(Color(hex: "#1E1E1E"))
            .cornerRadius(16)
            .padding(.horizontal, 24)

            // Action Buttons
            VStack(spacing: 8) {
                if isFriend {
                    Button(action: onSendMessage) {
                        HStack {
                            Image(systemName: "message.fill")
                            Text("Send Message")
                        }
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color(hex: "#34C759"))
                        .cornerRadius(16)
                    }

                    Button(action: {}) {
                        HStack {
                            Image(systemName: "music.note")
                            Text("Invite to Listen")
                        }
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color(hex: "#1E1E1E"))
                        .cornerRadius(16)
                    }
                } else {
                    Button(action: onAddFriend) {
                        HStack {
                            Image(systemName: "person.badge.plus")
                            Text("Add Friend")
                        }
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color(hex: "#34C759"))
                        .cornerRadius(16)
                    }
                }
            }
            .padding(.horizontal, 24)
            .padding(.bottom, 24)
        }
        .background(Color(hex: "#2C2C2C"))
        .presentationDetents([.medium])
    }
}
