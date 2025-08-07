"use client"

import * as React from "react"

export function useRealtime<T>(initial: T, updater: (v: T) => T, intervalMs = 4000) {
  const [value, setValue] = React.useState<T>(initial)
  React.useEffect(() => {
    const id = setInterval(() => setValue((v) => updater(v)), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, updater])
  return value
}
