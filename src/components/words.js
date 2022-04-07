const list = ["hello", "world", "pineappleo", "rubyo", "ostrawberry"];

function chooseRandom() {
  return list[Math.floor(Math.random() * list.length)];
}
export { chooseRandom };
