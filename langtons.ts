let world: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("world");
let ctx: CanvasRenderingContext2D = world.getContext('2d');

let width = world.width = 250;
let height = world.height = 250;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, width, height);

let iteration = 0;

let position = {
  x: width / 2,
  y: height / 2
};

let rules = [
  {
    name: "black",
    replace: "white",
    move: "left",
    color: [0, 0, 0]
  }, {
    name: "white",
    move: "right",
    replace: "black",
    color: [255, 255, 255]
  }
  // }, {
  //   name: "red",
  //   move: "left",
  //   replace: "black",
  //   color: [255, 0, 0]
  // }
];

var stop = 0;

function readPixel() {
  return ctx.getImageData(position.x, position.y, 1, 1).data;
}

let lastMove = "left";
function life() {
  if (stop) {
    return;
  }
  let color = readPixel();
  for (let rule of rules) {
    if (rule.color[0] == color[0] && rule.color[1] == color[1] && rule.color[2] == color[2]) {
      let next: any = rule.replace;

      for (let rule of rules) {
        if (rule.name == next) {
          next = rule;
          break;
        }
      }
      ctx.fillStyle = "rgb(" + next.color[0] + "," + next.color[1] + "," + next.color[2] + ")";
      ctx.fillRect(position.x, position.y, 1, 1);
      move(rule);
      break;
    }
  }
  requestAnimationFrame(life);
}

function move(rule) {
  iteration += 1;
  if (rule.move == "left") {
    if (lastMove == "up") {
      lastMove = "left";
      position.x -= 1;
    } else if (lastMove == "left") {
      lastMove = "down";
      position.y -= 1;
    } else if (lastMove == "down") {
      lastMove = "right";
      position.x += 1;
    } else if (lastMove == "right") {
      lastMove = "up";
      position.y += 1;
    }
  } else {
    if (lastMove == "up") {
      lastMove = "right";
      position.x += 1;
    } else if (lastMove == "right") {
      lastMove = "down";
      position.y -= 1;
    } else if (lastMove == "down") {
      lastMove = "left";
      position.x -= 1;
    } else if (lastMove == "left") {
      lastMove = "up";
      position.y += 1;
    }
  }
}

for (let i = 0; i < 50; i++) {
  requestAnimationFrame(life);
}

function faster() {
  for (let i = 0; i < 50; i++) {
    requestAnimationFrame(life);
  }
}

function stopc() {
  stop = 1;
  setTimeout(function () {
    stop = 0;
  }, 200);
}

console.log("life")
