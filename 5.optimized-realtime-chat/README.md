# 💬 Reusable Chat Component (with Fake WebSocket)

A real-time chat UI built using **React + TypeScript**, simulating WebSocket communication with a mock backend.

## 🎯 Features

- 📡 Simulated **WebSocket** behavior using `FakeWebSocket`
- 🧠 Auto-scroll to latest message
- 🧏‍♀️ **Accessibility-friendly**:
  - Uses `role="log"` with `aria-live="polite"` for screen reader announcements
  - Messages wrapped with `role="list"` and `role="listitem"`
  - Input field includes `aria-label`
- ⚡ Optimized with `React.memo()` for message rendering
- ⌨️ Keyboard support for sending messages via `Enter` key

---

## 🧠 Performance Insight

- `MessageItem` is wrapped in `React.memo()` to avoid unnecessary re-renders.
- `useCallback()` used for message sending to avoid re-creating the function.
- Uses `useRef()` for the scroll container and WebSocket reference to avoid state-related rerenders.
- (Optionally) we can introduce virtualization using `react-window` for large message lists to improve performance further

> `console.log()` inside `MessageItem` shows when each message re-renders — helpful for debugging and learning!

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```
