function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function createArrow(c, xStart, yStart, xEnd, yEnd) {
  var canvas = document.getElementById("gameWindow");
  var ctx = canvas.getContext("2d");
  let headlen = 20; // length of head in pixels
  let dx = xEnd - xStart;
  let dy = yEnd - yStart;

  let angle = Math.atan2(dy, dx);

  ctx.save();
  ctx.moveTo(xStart, yStart);
  ctx.lineTo(xEnd, yEnd);
  ctx.lineTo(xEnd - headlen * Math.cos(angle - Math.PI / 6), yEnd - headlen * Math.sin(angle - Math.PI / 6));
  ctx.moveTo(xEnd, yEnd);
  ctx.lineTo(xEnd - headlen * Math.cos(angle + Math.PI / 6), yEnd - headlen * Math.sin(angle + Math.PI / 6));
  ctx.strokeStyle = "#FF9505";
  ctx.stroke();
  ctx.closePath();
}

export { getRandomInt, createArrow };
