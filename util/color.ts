import { easeInOutQuad } from './easing'

export const rotateHue = (hue, rotation) => {
  let rotatedHue
  rotatedHue = hue - rotation
  if (rotatedHue < 0) {
    rotatedHue = 360 + rotatedHue
  }
  return rotatedHue
}

export const hsl = array => {
  let [h, s, l] = array
  h = Math.round(h)
  s = Math.round(s)
  l = Math.round(l)
  return 'hsl(' + h + ',' + s + '%,' + l + '%)'
}

export const hsla = (array, alpha) => {
  let [h, s, l] = array
  h = Math.round(h)
  s = Math.round(s)
  l = Math.round(l)
  return 'hsl(' + h + ',' + s + '%,' + l + '%, ' + alpha + ')'
}

export const mixHsl = (hslArrayOne, hslArrayTwo, mix1, mix2) => {
  let totalMix = mix1 + mix2
  let [h1, s1, l1] = hslArrayOne
  let [h2, s2, l2] = hslArrayTwo
  let h, s, l
  if (Math.abs(h1 - h2) > 0.5) {
    h1 += 1
  } // > 179.5 is shorter part from wheel to 359
  h =
    (easeInOutQuad(mix1) / totalMix) * h1 +
    (easeInOutQuad(mix2) / totalMix) * h2
  s = (mix1 / totalMix) * s1 + (mix2 / totalMix) * s2
  l = (mix1 / totalMix) * l1 + (mix2 / totalMix) * l2
  if (h > 1) {
    h -= 1
  }
  return [h, s, l]
}
