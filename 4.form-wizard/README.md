# 🧾 Multi-Step Form Wizard (with Validation + Optimizations)

A fully optimized, accessible multi-step form built using **React**, **TypeScript**, **React Hook Form**, and **Yup**. Each step validates independently, tracks progress, and avoids unnecessary re-renders — ideal for real-world multi-step flows like signups, onboarding, or checkouts.

---

## 🧠 Performance Insight

- Used `React.memo()` to memoize static components like `Buttons`.
- Validation logic scoped **per-step** with `yupResolver(stepSchemas[step])` to avoid re-parsing full schemas unnecessarily.
- `console.log()` added at key components (Step1, Buttons, Form) to trace which parts re-render.
- `useCallback()` ensures prop references don’t cause child re-renders on every step change.

> Even with frequent typing and validation, the form remains **fast and efficient**.

---

## ♿ Accessibility Considerations

- Inputs include `aria-invalid` to help screen readers detect errors.
- Current step indicator uses `aria-current="step"` (you can wrap this in `<nav><ol>` for semantic enhancement).
- Validation errors are shown directly below each input for easy user feedback.

---

## 🧪 Tech Stack

- **React + TypeScript**
- **React Hook Form**
- **Yup** for schema validation

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```
