const BREAKPOINT = {
  DEFAULT: 1280,
}

const mediaQuery = window.matchMedia(`(min-width: ${BREAKPOINT.DEFAULT}px)`)

export { mediaQuery }