// ─────────────────────────────────────────────────────────────────────────────
// SHIM — backward-compat re-export
// ─────────────────────────────────────────────────────────────────────────────
//
// The real navigation config is now in:
//   content/config/navigation.ts   ← edit this to change the sidebar
//
// This file re-exports derived helpers so existing imports like
//   import { navigation } from '@/config/navigation'
// continue to work without changes.
// ─────────────────────────────────────────────────────────────────────────────

export {
  navGroups as navigation,
  navGroups,
  flatNavigation,
  getPrevNext,
  defaultSlug,
} from '@/lib/navigation'
