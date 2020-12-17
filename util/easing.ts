export const mix = (stationary, moving, mix) => {
  const difference = moving - stationary
  const current = stationary + difference * mix
  return current
}

export const easeInOutQuad = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

export const easeInQuad = t => t * t
