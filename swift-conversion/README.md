# InRoom Music Page - Swift/SwiftUI Implementation

这是从 React/TypeScript 转换的 Swift/SwiftUI 实现，包含了 InRoom 页面的所有关键功能。

## 文件结构

### 核心文件
- **Models.swift** - 数据模型和 ViewModel（状态管理）
- **InRoomPage.swift** - 主页面，包含双页面滑动逻辑
- **AlbumPlaybackAreaView.swift** - 3D 专辑封面展示和播放控制
- **RoomMembersAreaView.swift** - 房间成员展示区
- **RoomChatContentView.swift** - 聊天界面
- **TopNavigationView.swift** - 顶部导航栏
- **DialogViews.swift** - 各种对话框（设置、邀请、用户信息）
- **PlaylistSheetView.swift** - 播放列表和搜索歌曲
- **ColorExtension.swift** - Hex 颜色支持扩展

## 主要功能实现

### 1. 状态管理
使用 `InRoomViewModel` (ObservableObject) 管理所有状态：
- 播放状态（歌曲、进度、播放/暂停）
- 房间设置
- 页面切换
- 对话框状态

### 2. 双页面滑动
- 使用 `HStack` + `offset` 实现左右滑动
- 支持手势拖拽切换
- Spring 动画效果
- 页面指示器同步更新

### 3. 3D 专辑封面堆叠
- 使用 `ZStack` + `rotation3DEffect` 实现 3D 效果
- 扑克牌式层叠布局
- 当前歌曲有旋转动画
- 阴影和光环效果

### 4. 聊天功能
- 消息气泡布局
- 自动滚动到最新消息
- 头像展示逻辑（连续消息只显示一次）
- 发送消息功能

### 5. 播放控制
- Timer 实现播放进度
- 上一曲/下一曲
- 播放/暂停
- 进度条拖拽

### 6. 播放列表管理
- 歌曲列表展示
- 添加歌曲（带搜索功能）
- 删除歌曲
- 置顶歌曲（Pin）

## 使用方法

```swift
// 在 ContentView 或 App 中使用
InRoomPage(
    roomId: "room-123",
    roomName: "Sunset Rollercoaster Exclusive",
    songs: mockSongs,
    members: mockMembers,
    onBack: {
        // 返回逻辑
    }
)
```

## 关键技术点

### SwiftUI 特性
- `@StateObject` 和 `@ObservedObject` - 状态管理
- `@Binding` - 双向绑定
- `@Environment(\.dismiss)` - 关闭视图
- `.sheet()` - 底部弹窗
- `.alert()` - 警告对话框
- `GeometryReader` - 获取视图尺寸
- `DragGesture` - 手势处理

### 动画
- `withAnimation` - 动画包装
- `.animation()` - 视图动画
- `.spring()` - 弹簧动画
- `rotation3DEffect` - 3D 旋转
- `transition` - 过渡效果

### 布局
- `ZStack` - 层叠布局
- `HStack` / `VStack` - 水平/垂直布局
- `ScrollView` - 滚动视图
- `LazyVStack` - 懒加载列表
- `Spacer()` - 弹性空间

## 与原版 React 的差异

1. **状态管理**：React 的 `useState` → SwiftUI 的 `@State/@Published`
2. **动画库**：Framer Motion → SwiftUI 原生动画
3. **组件通信**：Props/Callbacks → `@Binding`/闭包
4. **样式**：Tailwind CSS → SwiftUI 修饰符
5. **异步图片**：ImageWithFallback → `AsyncImage`

## 待完善功能

如需完整实现，还需添加：
- Toast 通知（可使用第三方库如 AlertToast）
- 实时消息同步（WebSocket）
- 音频播放器集成（AVPlayer）
- 网络请求（URLSession）
- 持久化存储（UserDefaults/CoreData）

## 依赖要求

- iOS 15.0+
- Xcode 13.0+
- SwiftUI

## 注意事项

1. 所有颜色使用 Hex 字符串（需要 `ColorExtension.swift`）
2. 图片 URL 使用 `AsyncImage` 异步加载
3. Timer 需在 ViewModel 的 `deinit` 中清理
4. 手势冲突需要合理处理优先级

## 性能优化建议

- 使用 `LazyVStack` 而非 `ForEach` 直接在 `VStack` 中
- 图片加载使用缓存
- 避免在 body 中进行复杂计算
- 使用 `@StateObject` 而非重复创建 ViewModel
