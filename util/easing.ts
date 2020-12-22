export const mix = (base, target, mix) => {
  const difference = target - base
  return base + difference * mix
}

export const easeInOutQuad = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

export const easeInQuad = t => t * t

export const easeOutQuad = t => t * (2 - t)

export const easeInSin = t => 1 - Math.cos((t * Math.PI) / 2)

export const bias = (t, b = 0.5) => t - Math.abs(t - b) / b

export const easeOutExpo = x => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x))

export const easeInExpo = x => (x === 0 ? 0 : Math.pow(2, 10 * x - 10))

export const randBias = ({
  min,
  max,
  bias,
  easingFunction = x => x,
  wholeNumber = false,
}) => {
  max = max < min ? min + 1 : max
  bias = bias > max ? max : bias < min ? min : bias
  let random = 0
  let odds = 0
  while (Math.random() > odds) {
    if (wholeNumber) {
      random = Math.floor(Math.random() * (max - min + 1)) + min
    } else {
      random = Math.random() * (max - min) + min
    }
    odds =
      random > bias
        ? (max - random) / (max - bias)
        : (random - min) / (bias - min)
    odds = easingFunction(odds)
  }
  return random
}
