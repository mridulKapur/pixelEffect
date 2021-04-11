const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 200;
canvas.height = 300;

const image1 = new Image();
image1.src = './1-200x300.jpg';

image1.addEventListener('load', () => {
    ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(scannedImage);
    const scannedData = scannedImage.data;
    for (let i = 0; i < scannedData.length; i += 4){
        let r = scannedData[i];
        let g = scannedData[i+1];
        let b = scannedData[i + 2];
        let avg = (r + g + b) / 3;
        scannedData[i]=avg +50;
        scannedData[i+1]=avg-50;
        scannedData[i + 2]=avg-100;
    }
    scannedImage.data = scannedData;
    ctx.putImageData(scannedImage, 0, 0);
})

