import SwiftUI

struct RoomMembersAreaView: View {
    let members: [Member]
    let realtimeMessage: String
    let onInvite: () -> Void

    @State private var showMessage = false
    @State private var messageOpacity = 1.0
    @State private var selectedMember: Member?
    @State private var showUserInfo = false

    var body: some View {
        VStack(spacing: 0) {
            // Title Bar
            HStack {
                Text("Room Members")
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundColor(.white)

                Spacer()

                Button(action: onInvite) {
                    HStack(spacing: 4) {
                        Image(systemName: "person.badge.plus")
                            .font(.system(size: 16))
                        Text("Invite")
                            .font(.system(size: 15))
                    }
                    .foregroundColor(Color(hex: "#34C759"))
                }
            }
            .frame(maxWidth: 280)
            .frame(maxWidth: .infinity)

            // Member Avatar List
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 12) {
                    ForEach(members) { member in
                        VStack(spacing: 8) {
                            Button(action: {
                                selectedMember = member
                                showUserInfo = true
                            }) {
                                ZStack(alignment: .topTrailing) {
                                    AsyncImage(url: URL(string: member.avatar)) { image in
                                        image
                                            .resizable()
                                            .aspectRatio(contentMode: .fill)
                                    } placeholder: {
                                        Circle()
                                            .fill(Color(hex: "#333333"))
                                            .overlay(
                                                Text(String(member.name.prefix(1)).uppercased())
                                                    .foregroundColor(.white)
                                            )
                                    }
                                    .frame(width: 40, height: 40)
                                    .clipShape(Circle())

                                    if member.isCreator {
                                        Image(systemName: "crown.fill")
                                            .font(.system(size: 12))
                                            .foregroundColor(Color(hex: "#34C759"))
                                            .offset(x: 4, y: -4)
                                    }
                                }
                            }

                            Text(member.name.count > 4 ? String(member.name.prefix(4)) + "..." : member.name)
                                .font(.system(size: 13))
                                .foregroundColor(.white)
                                .frame(maxWidth: 40)
                        }
                    }
                }
                .padding(.horizontal, 10)
            }
            .padding(.top, 15)

            // Real-Time Prompt
            if !realtimeMessage.isEmpty {
                Text(realtimeMessage)
                    .font(.system(size: 14))
                    .foregroundColor(Color(hex: "#999999"))
                    .opacity(messageOpacity)
                    .padding(.top, 10)
                    .onAppear {
                        showMessage = true
                        messageOpacity = 1.0

                        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                            withAnimation(.linear(duration: 1)) {
                                messageOpacity = 0
                            }
                            DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                                showMessage = false
                            }
                        }
                    }
            }
        }
        .padding(.horizontal, 20)
        .padding(.bottom, 12)
        .sheet(item: $selectedMember) { member in
            UserInfoSheetView(
                userName: member.name,
                userAvatar: member.avatar,
                listeningHours: Int.random(in: 5...50),
                isFriend: Bool.random(),
                onSendMessage: {
                    showUserInfo = false
                    // Show toast: "Opening chat with \(member.name)"
                },
                onAddFriend: {
                    showUserInfo = false
                    // Show toast: "Friend request sent to \(member.name)"
                }
            )
        }
    }
}
