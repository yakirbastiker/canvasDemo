let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let c = canvas.getContext("2d");

//c.fillStyle = 'red';
//c.fillRect(x,y,width,height);
//c.fillRect(100,100,100,100);


//line 
//c.beginPath();
//c.moveTo(50,300);
//c.lineTo(300,500);
//c.strokeStyle = 'green';
//c.stroke();


//arc / circle

//c.arc(x,y,radious, startAngle)
//c.arc(200, 100, 30,0, Math.PI*2, false);
//c.stroke();

//random circle with random color
// for(let i =0; i < 3; i++) {
//     let x = Math.random() * canvas.width;
//     let y = Math.random() * canvas.height;


//     c.beginPath();
//     c.arc(x, y, 30,0, Math.PI*2, false);
//     c.strokeStyle = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
//     c.stroke();
// }


//moving circle

// let moveX = 200;
// let dx =4;
// let radious = 30;
// let moveY = 200;
// let dy = 4;

// function movingCircle() {
//     requestAnimationFrame(movingCircle);
//     c.clearRect(0,0,innerWidth,innerHeight);  //clear canvas
    

//     c.beginPath();
//     c.arc(moveX, moveY, radious,0, Math.PI*2, false);
//     c.strokeStyle = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;
//     c.stroke();

//     if(moveX + radious > innerWidth || moveX - radious < 0) {
//         dx=-dx;
//     }
//     if(moveY + radious > innerHeight || moveY - radious < 0) {
//         dy=-dy;
//     }
//     moveX+=dx;
//     moveY+=dy;
// }

function randomColor () {
    return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
}


function Circle(x,y,dx,dy,radious) {
    this.x= x;
    this.y= y;
    this.radious = radious;
    this.dx = dx;
    this.dy = dy;
    this.color =  randomColor();

    this.draw = function () {
         
        c.beginPath();
        c.arc(this.x, this.y, this.radious,0, Math.PI*2, false);       
        c.fillStyle = this.color;
        c.fill()
        c.stroke();
    }

    this.update = function() {
        if(this.x + this.radious > innerWidth || this.x - this.radious < 0) {
            this.dx=-this.dx;
        }
        if(this.y + this.radious > innerHeight || this.y - this.radious < 0) {
            this.dy=-this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;

        //Interacting 
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if(this.radious < 40) {
                this.radious +=1;
            }
        }else if(this.radious > 2) {
            this.radious -=1;
        }

        this.draw()
    }
}

//let circle = new Circle(200,200,30,4,4);
let circleArr = [];

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for(let i=0; i< circleArr.length; i++) {
        circleArr[i].update();
    }
    
}
animate();





for(let i=0; i< 100; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let dx = (Math.random() - 0.5) * 8;
    let dy = (Math.random() - 0.5) * 8;
    let radious = Math.random() * 3 + 1;
    circleArr.push(new Circle(x,y,dx,dy,radious));
}



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
});





