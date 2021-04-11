const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 200;
canvas.height = 300;

const image1 = new Image();
image1.src = 'data:image/jpeg;base64,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';

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
