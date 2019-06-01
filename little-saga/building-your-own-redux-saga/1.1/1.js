
function* range(start, end) {
  for (let index = start; index < end; index++) {
    yield index
  }
}

for (const x of range(1, 10)) {
  console.log(x)
}