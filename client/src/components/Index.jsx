// components/index.js
// Barrel file — export all components from one place for clean imports.
//
// Instead of:
//   import Button from "../components/Button";
//   import Modal  from "../components/Modal";
//
// You can now write:
//   import { Button, Modal, Toast } from "../components";

// ── Base UI components ─────────────────────────────────────────────────
export { default as Button }       from "./Button";
export { default as InputField }   from "./InputField";
export { default as SelectField }  from "./SelectField";
export { default as SectionCard }  from "./SectionCard";
export { default as Modal }        from "./Modal";
export { default as Loader }       from "./Loader";
export { default as ThemeToggle }  from "./ThemeToggle";

// Toast — also exports named hooks/provider
export { default as Toast, ToastProvider, useToast } from "./Toast";

// ── Layout components ──────────────────────────────────────────────────
export { default as Navbar }             from "./Navbar";
export { default as Footer }             from "./Footer";
export { default as Hero }               from "./Hero";
export { default as Card }               from "./Card";

// ── Feature components ────────────────────────────────────────────────
export { default as ProductForm }        from "./ProductForm";
export { default as ToneSelector }       from "./ToneSelector";
export { default as PlatformSelector }   from "./PlatformSelector";
export { default as OutputEditor }       from "./OutputEditor";
export { default as PreviewCard }        from "./PreviewCard";