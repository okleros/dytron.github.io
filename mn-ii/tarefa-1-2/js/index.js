var canvas = [];
for (let i = 0; i < 9; i++) {
    canvas[i] = document.querySelector(`#canvas-${i}`);
}
var ctx = canvas[0].getContext('2d');
var usingDefaultImage = false, defaultImage="";

var input, file, fr;
function loadImage() {
    var progress = document.querySelector('#progress');
        progress.innerHTML = 'Carregando...';
    if (typeof window.FileReader !== 'function') {
        alert("A file API não é suportada pelo browser.");
        return;
    }
    input = document.getElementById('imgfile');
    if (!input) {
        alert("Elemento imgfile não encontrado.");
    }
    else if (!input.files) {
        alert("Esse browser parece não suportar a propriedade 'files' da entrada de arquivo.");
    }
    else if (!input.files[0]) {
        alert("Por favor, selecione uma imagem antes de clicar em 'Carregar'.");
    }
    else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = createImage;
        fr.readAsDataURL(file);
    }
}
function createImage() {
    var t1 = new Date();
    var img = new Image();
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
        let C = Matrix.createImage(img.width, img.height, 255, true).forEachElement(
            (k, y, x) => {
                return Math.clamp(Math.sqrt((A[k][y][x]**2 + B[k][y][x]**2)), 0, 255);
            }).toImage(canvas[5])
        // Threshold (Matriz final D)
        C.forEachElement(
            (k, y, x) => {
                return (C[k][y][x] > slider1.value) ? 255 : 0;
            }).toImage(canvas[6]);
    
        let E = matrix.applyFilter(Matrix.getLaplaceKernel("2"));    
        E.forEachElement(
            (k, y, x) => {
                return E[k][y][x] + 128;
            }).toImage(canvas[7])
        .forEachElement(
            (k, y, x) => {
                return (E[k][y][x] - 128 >= slider2.value) ? 255 : 0;
            }).toImage(canvas[8]);
        // Tempo
        let dt = new Date() - t1;
        progress.innerHTML = 'Tempo = ' + dt + ' ms';
        canvas.forEach(c => {
            c.style["display"] = "inline";
        });
        document.getElementById("imgs").style.display = "block";
    };

    if (!usingDefaultImage)
        img.src = fr.result;
    else
        img.src = defaultImage;
    usingDefaultImage = false;
};

var slider1 = document.getElementById("myRange1");
var output1 = document.getElementById("value1");
output1.innerHTML = slider1.value;
slider1.oninput = function() {
    output1.innerHTML = this.value;
}

var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("value2");
output2.innerHTML = slider2.value;
slider2.oninput = function() {
    output2.innerHTML = this.value;
}
var buttonConfirm = document.querySelector('#image-confirm');
var selectedImage = document.querySelector('#image-combobox');
buttonConfirm.onclick = function(){
    usingDefaultImage = true;
    defaultImage = 'img/' + selectedImage.value + '.jpg';
    console.log(selectedImage.value);
    createImage();
};
        
    






// Imagem carregada


//img.src = 'img/carro.jpg';