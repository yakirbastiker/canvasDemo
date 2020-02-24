const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

function randomColor () {
    return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
}

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function distance(x1, y1, x2, y2 ){
    const xDist = x2- x1;
    const yDist = y2- y1;

    return Math.sqrt(Math.pow(xDist,2) + Math.pow(yDist,2));
}

function rotate(velocity, angle) {
    const rotateVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    }

    return rotateVelocities;
}


function resolveCollision(Particle, otherParticle) {
    const xVelocityDiff = Particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = Particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - Particle.x;
    const yDist = otherParticle.y - Particle.y;

    //prevent accidental overlap of particlessss
    if(xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        //grab angle between the two particles
        const angle = -Math.atan2(otherParticle.y - Particle.y, otherParticle.x - Particle.x);

        //store mass in var for better readibillity in collision equation
        const m1 = Particle.mass;
        const m2 = otherParticle.mass;

        //velocity before equation
        const u1 = rotate(Particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        //velocity after 1d collision equation
        const v1 = {x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 *m2 / (m1 + m2), y: u1.y};
        const v2 = {x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 *m2 / (m1 + m2), y: u1.y};

        //final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        //swap particle velocities for realistic bounce effect
        Particle.velocity.x = vFinal1.x;
        Particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;

        //change color 
        Particle.color = randomColor();
        otherParticle.color = randomColor();
    }
}

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.mass = 1;
    this.velocity = {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5
    };
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.strokeStyle = this.color;
    c.stroke();
    c.closePath();
  }

  update = Particles => {
    this.draw()

    for(let i = 0; i < Particles.length; i++) {
        if(this === Particles[i]) continue;
        if(distance(this.x,this.y, Particles[i].x,Particles[i].y) - this.radius * 2 < 0) {
            resolveCollision(this, Particles[i]);
        }
    }

    //collision with eadgh
    if(this.x - this.radius <= 0 || this.x + this. radius >= innerWidth) {
        this.velocity.x = -this.velocity.x;
    }

    if(this.y - this.radius <= 0 || this.y + this. radius >= innerHeight) {
        this.velocity.y = -this.velocity.y;
    }

    //mouse collision detection
    if(distance(mouse.x,mouse.y, this.x, this.y) < 30) {
        this.color = randomColor();
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}



// Implementation
let Particles;

function init() {
    Particles = []

  for (let i = 0; i < 40; i++) {

    const radius = 10;
    let x =  randomIntFromRange(radius, canvas.width - radius);
    let y = randomIntFromRange(radius, canvas.height - radius);   
    const color = randomColor ();

    if(i !== 0) {
        for(let j = 0; j < Particles.length; j++){
            if(distance(x,y, Particles[j].x,Particles[j].y) - radius * 2 < 0) {
                x = randomIntFromRange(radius, canvas.width - radius)
                y = randomIntFromRange(radius, canvas.height - radius)

                j = -1;
            }
        }
    }
    Particles.push(new Particle(x, y, radius, color))     
  }
  
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  Particles.forEach(Particle => {
    Particle.update(Particles)
   })
}

init()
animate()