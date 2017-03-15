var how = document.getElementById("how");
var world = document.getElementById("world");
var ctx = world.getContext('2d');
var width = world.width = 500;
var height = world.height = 500;
var iteration = 0;
var position = {
    x: width / 2,
    y: height / 2
};

function ruleGenerator(str) {
    var rules = [];

    var l = str.length - 1;
    str.split('').forEach(function (k, i) {
        rules.push({
            name: "r_" + i,
            move: k == 'L' ? 'left' : 'right',
            replace: l == i ? ("r_0") : ("r_" + (i + 1)),
            color: [Math.random() * 255 >> 0, Math.random() * 255 >> 0, Math.random() * 255 >> 0]
        });
    });

    return rules;
}

var rules;

var stop = 0;
function readPixel() {
    return ctx.getImageData(position.x, position.y, 1, 1).data;
}
var lastMove = "left";
function life() {
    if (stop) {
        return;
    }
    var color = readPixel();
    for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
        var rule = rules_1[_i];
        if (rule.color[0] == color[0] && rule.color[1] == color[1] && rule.color[2] == color[2]) {
            var next = rule.replace;
            for (var _a = 0, rules_2 = rules; _a < rules_2.length; _a++) {
                var rule_1 = rules_2[_a];
                if (rule_1.name == next) {
                    next = rule_1;
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
        }
        else if (lastMove == "left") {
            lastMove = "down";
            position.y -= 1;
        }
        else if (lastMove == "down") {
            lastMove = "right";
            position.x += 1;
        }
        else if (lastMove == "right") {
            lastMove = "up";
            position.y += 1;
        }
    }
    else {
        if (lastMove == "up") {
            lastMove = "right";
            position.x += 1;
        }
        else if (lastMove == "right") {
            lastMove = "down";
            position.y -= 1;
        }
        else if (lastMove == "down") {
            lastMove = "left";
            position.x -= 1;
        }
        else if (lastMove == "left") {
            lastMove = "up";
            position.y += 1;
        }
    }


}

function faster() {
    for (var i = 0; i < 50; i++) {
        requestAnimationFrame(life);
    }
}

function stopc(fn) {
    stop = 1;
    setTimeout(function () {
        stop = 0;
        if (fn) fn();
    }, 200);
}

function start(w, h) {
    width = world.width = w || 1000;
    height = world.height = h || 1000;

    iteration = 0;
    position = {
        x: width / 2,
        y: height / 2
    };

    rules = ruleGenerator(how.value);
    ctx.fillStyle = "rgb(" + rules[0].color[0] + ", " + rules[0].color[1] + ", " + rules[0].color[2] + ")";
    ctx.fillRect(0, 0, width, height);


    requestAnimationFrame(life);
}