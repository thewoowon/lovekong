import { useState, useEffect, useRef } from 'react'

const useThrottling = <T = any>(value: T, delay: number) => {
  const [throttlingValue, setThrottlingValue] = useState(value)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (!timer.current) {
      const handler = setTimeout(() => {
        setThrottlingValue(value)
      }, delay)
      timer.current = handler
    }
  }, [value, delay])
  return throttlingValue
}

export default useThrottling
