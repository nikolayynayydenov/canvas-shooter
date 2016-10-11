let canvas = document.getElementById('shooter-canvas');
let ctx = canvas.getContext('2d');

class Player {
    constructor(img) {
        this.img = img;
    }
}

let a = new Player('yovcho.jpg');
a.upKey = 'KeyW';
a.downKey = 'KeyS';
a.shootKey = 'Space';
a.width = 30;
a.height = 30;
a.x = 0;
a.y = 0;
a.movePace = 8;
a.position = 'left';

let b = new Player('boss.jpg');
b.upKey = 'Numpad8';
b.downKey = 'Numpad2';
b.shootKey = 'Numpad5';
b.width = 30;
b.height = 30;
b.x = canvas.width - b.width;
b.y = 0;
b.movePace = 8;
b.position = 'right';

let ball = {
    radius: 4,
    color: 'red',
    movePace: 40
};

document.addEventListener('keypress', (event) => {
    switch(event.code) {
        case a.upKey:
            drawImage(a);
            a.y = a.y - a.movePace;
            break;
        
        case a.downKey:
            drawImage(a);
            a.y = a.y + a.movePace;
            break;

        case a.shootKey:
            shootRight(a, b, ball);
            break;
        
        case b.upKey:
            drawImage(b);
            b.y = b.y - b.movePace;
            break;
        
        case b.downKey:
            drawImage(b);
            b.y = b.y + b.movePace;
            break;

        case b.shootKey:
            shootLeft(b, a, ball);
            break;
        
        default:
            break;
    }
});

// initial display:

drawImage(a);
drawImage(b);

function shootRight(player, opponent, ball) {
    // this function is invoked when player 1 shoots:

    let centerX = player.width + ball.radius;
    let centerY = player.y + player.height / 2;
    let addElement = 1;

    let moveBallInterval = setInterval(() => {
        let clearRectX = centerX - ball.radius;
        let clearRectY = centerY - ball.radius;
        let clearRectWidth = ball.radius * 2;
        let clearRectHeight = ball.radius * 2; // these 2 vars should be outside so they are not declared each time the setInterval function is invoked

        ctx.clearRect(clearRectX, clearRectY, clearRectWidth, clearRectHeight);
        
        if(centerX + ball.radius > opponent.x &&
            centerY >= opponent.y && centerY <= opponent.y + opponent.height) {
            // if a target is reached
            clearInterval(moveBallInterval);
            alert('player 1 wins!');
        }
        else if(centerX + ball.radius > canvas.width) {
            console.log('end reached');
            clearInterval(moveBallInterval);
        }

        ctx.beginPath();
        ctx.arc(centerX + addElement, centerY, ball.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = ball.color;
        ctx.fill();

        centerX += addElement;
    }, ball.movePace);
}

function shootLeft(player, opponent, ball) {
    // this function is invoked when player 2 shoots:

    let centerX =player.x - ball.radius;
    let centerY = player.y + player.height / 2;
    let addElement = -1;

    let moveBallInterval = setInterval(() => {
        let clearRectX = centerX - ball.radius;
        let clearRectY = centerY - ball.radius;
        let clearRectWidth = ball.radius * 2;
        let clearRectHeight = ball.radius * 2; // these 2 vars should be outside so they are not declared each time the setInterval function is invoked

        ctx.clearRect(clearRectX, clearRectY, clearRectWidth, clearRectHeight);

        if(centerX + ball.radius < opponent.x + opponent.width &&
            centerY >= opponent.y && centerY <= opponent.y + opponent.height) {
            // if a target is reached
            clearInterval(moveBallInterval);
            alert('player 2 wins!');
        }
        else if(centerX + ball.radius < 0) {
            console.log('end reached');
            clearInterval(moveBallInterval);
        }

        ctx.beginPath();
        ctx.arc(centerX + addElement, centerY, ball.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = ball.color;
        ctx.fill();

        centerX += addElement;


    }, ball.movePace);
}

function drawImage(player) {
    // used to draw the two images (the opponents)

    // first clear the space

    ctx.clearRect(player.x, player.y, player.width, player.height);

    // check if the end of the canvas is near:

    if(player.y < 0) {
        player.y = 0;
    }
    else if(player.y > canvas.height - player.height) {
        player.y = canvas.height - player.height;
    }

    // then draw the image with the new position

    let baseImage = new Image();
    baseImage.src = `images/${player.img}`;
    baseImage.onload = function() {
        ctx.drawImage(baseImage, player.x, player.y, player.width, player.height);
    }
}