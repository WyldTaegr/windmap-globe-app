'use client'

import styles from './FloatingNavbar.module.css'

interface FloatingNavbarProps<Mode extends string> {
  modes: readonly Mode[]
  activeMode: Mode
  onModeChange: (mode: Mode) => void
}

export default function FloatingNavbar<Mode extends string>({
  modes,
  activeMode,
  onModeChange,
}: FloatingNavbarProps<Mode>) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>My3DApp</div>
      <ul className={styles.navLinks}>
        {modes.map((mode) => (
          <li key={mode}>
            <button
              className={`${styles.navButton} ${
                activeMode === mode ? styles.active : ''
              }`}
              onClick={() => onModeChange(mode)}
              aria-pressed={activeMode === mode}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
