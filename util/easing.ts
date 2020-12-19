export const mix = (stationary, moving, mix) => {
  const difference = moving - stationary
  const current = stationary + difference * mix
  return current
}

export const easeInOutQuad = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

export const easeInQuad = t => t * t

export const easeOutQuad = t => t * (2 - t)

export const easeInSin = t => 1 - Math.cos((t * Math.PI) / 2)

export const bias = (t, b = 0.5) => t - Math.abs(t - b) / b

export const easeOutExpo = x => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x))
