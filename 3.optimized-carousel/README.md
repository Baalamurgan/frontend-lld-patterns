# 🎠 Reusable Carousel Component (with Touch & Autoplay)

A reusable, accessible carousel (slider) built using **React + TypeScript**, featuring:

- ⏩ **Autoplay with pause on hover**
- 🎯 **Arrow key navigation**
- 📱 **Mobile swipe gesture support**
- ♿ **Keyboard focus trapping**
- 🔁 Optional **looping behavior**

---

## 🧠 Performance Insight

- Optimized with `React.memo()` to avoid unnecessary re-renders of arrow controls.
- Uses `useRef` for swipe gesture accuracy without triggering re-renders.
- Keyboard navigation is active only when the component is focused (`tabIndex={0}`).

> All slides are rendered, but only one is visible — easily extensible for sliding animations using `transform: translateX()`.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```
