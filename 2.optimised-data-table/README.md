# 📊 Virtualized Data Table (Search - Debounced + Filter + Windowing)

A high-performance React + TypeScript data table with:

- 🔎 Search with debounce
- 🎯 Role-based filtering
- 🚀 Virtualized rows (using `react-window`)
- 🧠 Memoized components to minimize re-renders
- ✅ Accessible labels & keyboard-friendly

---

## 🧠 Performance Insight

This table uses `React.memo`, `useMemo`, and `useCallback` to **prevent unnecessary re-renders** — even when handling thousands of rows. With `react-window`, only visible rows are rendered, keeping DOM lightweight.

> Try scrolling or searching — `console.log` helps track which components re-render!

---

## 🛠️ Getting Started

```bash
npm install
npm run dev
```
