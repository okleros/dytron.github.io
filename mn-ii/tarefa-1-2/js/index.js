var canvas = [];
for (let i = 0; i < 7; i++) {
    canvas[i] = document.querySelector(`#canvas-${i}`);
}
var progress = document.querySelector('#progress');
var ctx = canvas[0].getContext('2d');
var img = new Image();
var t1 = new Date();

// Imagem carregada
img.onload = function () {
    ctx.canvas.width = img.width;
    ctx.canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    // Processar imagem
    let matrix = Matrix.getMatrixFromImage(canvas[0])
        .toBlackAndWhite()
        .toImage(canvas[1])
        .applyFilter(Matrix.getGaussianKernel(3))
        .toImage(canvas[2]);
    let A = matrix.applyFilter(Matrix.getSobelKernel("x")).toImage(canvas[3]);
    let B = matrix.applyFilter(Matrix.getSobelKernel("y")).toImage(canvas[4]);
    let C = Matrix.createImage(img.width, img.height, 255, true)
        .forEachElement(
            (k, y, x) => {
                return Math.clamp((A[k][y][x]**2 + B[k][y][x]**2) ** 0.5, 0, 255);
            })
        .toImage(canvas[5])
    // Threshold (Matriz final D)
    C.forEachElement(
        (k, y, x) => {
            return (C[k][y][x] > 180) ? 255 : 0;
        })
        .toImage(canvas[6]);
    // Tempo
    let dt = new Date() - t1;
    progress.innerHTML = 'Tempo = ' + dt + ' ms';
    canvas.forEach(c => {
        c.style["display"] = "inline";
    });
};

img.src = 'img/carro.jpg';