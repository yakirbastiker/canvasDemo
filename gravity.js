let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let c = canvas.getContext("2d");

let gravity = 1;
let friction = 0.99;

//add Interacting 

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

//canvas stay 100% when resize window
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

addEventListener('click', function() {
    init();
});


function randomColor () {
    return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for(let i = 0; i < ballArray.length; i++) {
       ballArray[i].update();
    }
    
}


function Ball(x,y,dy,dx,radious,color) {
    this.x= x;
    this.y= y;
    this.dy = dy;
    this.dx = dx;
    this.radious = radious;
    this.color =  color;

    this.draw = function () {
         
        c.beginPath();
        c.arc(this.x, this.y, this.radious,0, Math.PI*2, false);       
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }

    this.update = function() {
        //add gravity to update
        if(this.y +this.radious + this.dy > canvas.height){
            this.dy = -this.dy * friction;
        }else{
            this.dy += gravity;
            console.log(this.dy)
        } 

        if(this.x + this.radious +this.dx > canvas.width || this.x -this.radious  <= 0){
            this.dx = -this.dx;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}





// gravity

let ball;
let ballArray;
function init() {
    ballArray = [];
    for(let i =0; i < 100; i++){
        //random x 
        let radious = randomIntFromRange(4, 20);
        let x =  randomIntFromRange(radious, canvas.width - radious);
        let y =  randomIntFromRange(radious, canvas.height - radious);
        let dx = randomIntFromRange(-2, 2);
        let dy = randomIntFromRange(-2, 2);
        ballArray.push(ball = new Ball(x, y, dy,dx,radious,randomColor()));
    }   
};

init();
animate();