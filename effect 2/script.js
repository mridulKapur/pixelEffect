const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 200;
canvas.height = 300;

const image1 = new Image();
image1.src = './1-200x300.jpg';

const calculateBrightness = (r, g, b) => Math.sqrt((r*r)*0.299+(g*g)*0.587+(b*b)*0.144)/100

image1.addEventListener('load', () => {
    ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let particlesArray = [];
    const numberOfParticles = 6000;
    
    let mappedImage = [];
    for (let y = 0; y < canvas.height; y++){
        let row = [];
        for (let x = 0; x < canvas.width; x++){
            const base = (y * 4 * pixels.width) + (x * 4);
            const r = pixels.data[base];
            const g = pixels.data[base+1];
            const b = pixels.data[base + 2];
            const brightness = calculateBrightness(r, g, b);
            const cell = [
                cellBrigthness = brightness,r,g,b
            ];
            row.push(cell);
        }
        mappedImage.push(row);
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = 0;
            this.speed = 0;
            this.velocity = Math.random() * 1;
            this.size = Math.random() * 1.5 + 0.5;
            this.position1 = Math.floor(this.x);
            this.position2 = Math.floor(this.y);
            this.rgb = "0,0,0"
        }
        update() {
            this.position1 = Math.floor(this.x);
            this.position2 = Math.floor(this.y);
            this.speed = mappedImage[this.position2][this.position1][0];
            this.rgb = `${mappedImage[this.position2][this.position1][1]},${mappedImage[this.position2][this.position1][2]},${mappedImage[this.position2][this.position1][3]}`
            let movement = (3 - this.speed) + this.velocity;
            this.y += movement ;
            if (this.y >= canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.beginPath();
            ctx.fillStyle = `rgb(${this.rgb})`;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    function init() {
        for (let i = 0; i < numberOfParticles; i++){
            particlesArray.push(new Particle);
        }
    }
    init();
    function animate() {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = `rgb(0,0,0)`
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.2;
        // ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++){
            particlesArray[i].update();
            ctx.globalAlpha = particlesArray[i].speed * 0.05;
            particlesArray[i].draw();
        }
        requestAnimationFrame(animate);
    }
    animate();
})


