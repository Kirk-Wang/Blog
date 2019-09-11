export default function add(a, b) {
  let i = a.length - 1
  let j = b.length - 1
  let carry = 0
  let ret = ''
  while (i >= 0 || j >= 0) {
    let v1 = 0
    let v2 = 0
    let sum = 0
    if (i >= 0) {
      v1 = +a[i]
      i--
    }
    if (j >= 0) {
      v2 = +b[j]
      j--
    }
    sum = v1 + v2 + carry
    if (sum >= 10) {
      sum -= 10;
      carry = 1
    } else {
      carry = 0
    }
    ret = sum + ret
  }
  if (carry) {
    ret = carry + ret
  }
  return ret
}