const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];

let mouse = {
    x: null,
    y: null,
    radius: 70
}

window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
})

ctx.fillStyle= 'white';
ctx.font = '30px monospace';
ctx.fillText('RANDOMB',0,40)
const textCoordinate = ctx.getImageData(0, 0, 100, 100);


class Particle{
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
        this.color = `rgba(255,255,255,1)`;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size,0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
            this.color = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${distance})`;
        }
        else {
            this.color = `rgba(255,255,255,1)`;
            if (this.x != this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 20;
            }
            if (this.y != this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 20;
            }
        }
    }
}

function init() {
    particleArray = [];
    for (let y = 0, y2 = textCoordinate.height; y < y2; y+=1){
        for (x = 0, x2 = textCoordinate.width; x < x2; x+=1){
            if (textCoordinate.data[(y *4 *textCoordinate.width) + (x*4) + 3] > 128) {
                let positionX = x;
                let positionY = y;
                particleArray.push(new Particle(positionX * 10, positionY * 10));
            }
        }
    }
}

init();
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++){
        //particleArray[i].draw();
        particleArray[i].update();
    }
    connect();
    
    requestAnimationFrame(animate);
}
animate();

function connect() {
    for (let a = 0; a < particleArray.length; a++){
        for (let b = a; b < particleArray.length; b++){
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 20) {
                ctx.strokeStyle = `rgba(${(1000-particleArray[a].x)/1000*255},${((500-particleArray[a].x)*(500-particleArray[a].x)/500/500*255)},${(particleArray[a].x)/1000*255})`;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y)
                ctx.stroke();
            }
        }
    }
}