'use client'

import { useState } from 'react'
import ThreeScene from '@/components/ThreeScene'
import FloatingNavbar from '@/components/FloatingNavbar'
import styles from './page.module.css'

export default function HomePage() {
  // Define possible modes
  const modes = ['cube', 'sphere', 'cone'] as const
  type Mode = typeof modes[number]

  // State to track the active mode, default to 'cube'
  const [activeMode, setActiveMode] = useState<Mode>('cube')

  return (
    <div className={styles.container}>
      <ThreeScene activeMode={activeMode} />
      <FloatingNavbar
        modes={modes}
        activeMode={activeMode}
        onModeChange={setActiveMode}
      />
    </div>
  )
}
