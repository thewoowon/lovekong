import { useEffect, useRef } from 'react'

const useScrollFadeIn = (direction = 'up', duration = 1, delay = 0) => {
  const dom = useRef()
  useEffect(() => {
    const { current } = dom
    if (current) {
      const { style } = current
      style.transition = `opacity ${duration}s ease-in-out ${delay}s, transform ${duration}s ease-in-out ${delay}s`
      style.opacity = 0
      style.transform = `translate${direction === 'up' ? 'Y' : 'X'}(50px)`

      const onScroll = () => {
        const { scrollHeight, clientHeight } = document.body
        const { scrollTop } = document.documentElement
        if (scrollTop + clientHeight >= scrollHeight) {
          style.opacity = 1
          style.transform = 'translate(0)'
        }
      }
      window.addEventListener('scroll', onScroll)
      return () => window.removeEventListener('scroll', onScroll)
    }
  }, [direction, duration, delay])
  return { ref: dom, style: { opacity: 0 } }
}
