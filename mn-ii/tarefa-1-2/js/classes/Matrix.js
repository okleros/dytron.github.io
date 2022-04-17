class Matrix extends Array {
    constructor(n) {
        super(n);
        this.width = 0; // Largura
        this.height = 0; // Altura
        this.dimension = 2; // 2D ou 3D?
        this.isBlackAndWhite = false; // Use true em imagem sem cor para evitar repetição de cálculo
    }
    // Criar matriz n x m, com valor inicial value
    static create2D(n, m, value = 0) {
        let matrix = new Matrix(n);
        let i, j;
        for (i = 0; i < n; ++i) {
            matrix[i] = new Array(m);
            for (j = 0; j < m; ++j) {
                matrix[i][j] = value;
            }
        }
        matrix.width = m;
        matrix.height = n;
        return matrix;
    }
    // Criar matriz n x m x o, com valor inicial value
    static create3D(n, m, o, value = 0) {
        let matrix = new Matrix(n);
        let i, j, k;
        for (i = 0; i < n; ++i) {
            matrix[i] = new Array(m);
            for (j = 0; j < m; ++j) {
                matrix[i][j] = new Array(o);
                for (k = 0; k < o; ++k) {
                    matrix[i][j][k] = value;
                }
            }
        }
        matrix.width = o;
        matrix.height = m;
        matrix.dimension = 3;
        return matrix;
    }
    static fromArray(array) {
        let matrix = new Matrix(array.length);
        let i;
        for (i = 0; i < array.length; ++i) {
            matrix[i] = array[i];
        }
        matrix.width = array[0].length;
        matrix.height = array.length;
        return matrix;
    }
    // Criar matriz que representa uma imagem
    static createImage(w, h, color = 255, blackAndWhite = false) {
        let m = Matrix.create3D(4, h, w, color);
        m.isBlackAndWhite = blackAndWhite;
        return m;
    }
    // Imprimir matriz
    static print2D(matrix) {
        console.log(matrix);
    }
    // Processa cada elemento da matriz
    forEachElement(process) {
        if (this.dimension === 3) {
            let channels = (!this.isBlackAndWhite) ? 4 : 1;
            let k, x, y, width, height;
            width = this.width;
            height = this.height;
            for (y = 0; y < height; ++y) {
                for (x = 0; x < width; ++x) {
                    for (k = 0; k < 3; ++k) { // R, G, B
                        if (channels === 1 && k > 0)
                            this[k][y][x] = this[0][y][x];
                        else
                            this[k][y][x] = process(k, y, x);
                    }
                }
            }
        }
        return this;
    }
    // Tenta obter o elemento (i, j, k) da matriz, e usa o Extend se estiver fora da matriz
    getExtendedElement(i, j, k) {
        let m = this;
        i = Math.clamp(i, 0, m.length - 1);
        j = Math.clamp(j, 0, m[0].length - 1);
        k = Math.clamp(k, 0, m[0][0].length - 1);
        return m[i][j][k];
    }
    // Aplicar Filtro em uma matriz de imagem (retorna uma nova matriz)
    applyFilter(filter) {
        let image = this;
        let width = image.width;
        let height = image.height
        let filterSize = filter.width;
        let matrix = Matrix.createImage(width, height, 0, this.isBlackAndWhite);
        let m = Math.ceil((filterSize - 1) / 2);
        let k, c, x, y, h, w;
        let channels = (!this.isBlackAndWhite) ? 4 : 1;
        for (k = 0; k < channels; ++k) { // R, G, B, A
            for (y = 0; y < height; ++y) {
                for (x = 0; x < width; ++x) {
                    // Pixel (x, y), canal k (R, G, B ou A)
                    for (h = y; h < y + filterSize; ++h) {
                        for (w = x; w < x + filterSize; ++w) {
                            matrix[k][y][x] += filter[h - y][w - x] * image.getExtendedElement(k, h - m, w - m);
                        }
                    }
                    if (this.isBlackAndWhite) {
                        for (c = 1; c < 3; ++c) {
                            matrix[c][y][x] = matrix[0][y][x];
                        }
                        matrix[3][y][x] = 255;
                    }
                }
            }
        }
        for (k = 0; k < 4; ++k) { // R, G, B, A
            for (y = 0; y < height; ++y) {
                for (x = 0; x < width; ++x) {
                    matrix[k][y][x] = Math.round(matrix[k][y][x]);
                }
            }
        }
        return matrix;
    }
    // Obter matriz de uma imagem (pelo canvas)
    static getMatrixFromImage(canvas) {
        let w, h, ctx;
        ctx = canvas.getContext('2d');
        w = ctx.canvas.width;
        h = ctx.canvas.height;
        let matrix = Matrix.createImage(w, h);
        for (let x = 0; x < w; ++x) {
            for (let y = 0; y < h; ++y) {
                let rgba = Pixel.get(ctx, x, y); 
                for (let k = 0; k < 4; k++) {
                    matrix[k][y][x] = rgba[k];
                }
            }
        }
        return matrix;
    }
    // Obter imagem em preto e branco (método da média)
    toBlackAndWhite() {
        let width = this.width;
        let height = this.height;
        let x, y, k;
        let matrix = Matrix.createImage(width, height, 255, true);
        for (y = 0; y < height; ++y) {
            for (x = 0; x < width; ++x) {
                let average = 0;
                for (k = 0; k < 3; ++k) {
                    average += this[k][y][x];
                }
                average = Math.round(average / 3);
                for (k = 0; k < 3; ++k) {
                    matrix[k][y][x] = average;
                }
                matrix[3][y][x] = 255;
            }
        }
        return matrix;
    }
    // Desenha a matriz imagem no canvas
    toImage(canvas) {
        let x, y, k, w, h, ctx;
        ctx = canvas.getContext('2d');
        ctx.createImageData(this.width, this.height);
        ctx.canvas.width = w = this.width;
        ctx.canvas.height = h = this.height;
        for (x = 0; x < w; ++x) {
            for (y = 0; y < h; ++y) {
                let rgba = new Array(4);
                for (k = 0; k < 4; ++k) {
                    rgba[k] = Math.round(this[k][y][x]);
                }
                Pixel.set(ctx, x, y, rgba)
            }
        }
        return this;
    }
    // Matriz núcleo gaussiana (n deve ser ímpar): 
    static getGaussianKernel(n) {
        let k = (n - 1) / 2;
        let sigma = 1.0;
        let r, s = 2.0 * sigma ** 2;
        let sum = 0.0;
        let matrix = Matrix.create2D(n, n);
        let x, y;
        for (y = -k; y <= k; ++y) {
            for (x = -k; x <= k; ++x) {
                r = Math.sqrt(x ** 2 + y ** 2);
                matrix[y + k][x + k] = (Math.exp(-(r * r) / s)) / (Math.PI * s);
                sum += matrix[y + k][x + k];
            }
        }
        for (let i = 0; i < n; ++i)
            for (let j = 0; j < n; ++j)
                matrix[i][j] /= sum;
        return matrix;
    }
    // Matriz núcleo de Sobel
    static getSobelKernel(axis, n = 3) {
        if (axis === "x") {
            switch (n) {
                case 3: return Matrix.fromArray([
                    [-1, 0, 1],
                    [-2, 0, 2],
                    [-1, 0, 1]
                ]);
                case 5: return Matrix.fromArray([
                    [-1, -2, 0, 2, 1], 
                    [-2, -3, 0, 3, 2],
                    [-3, -5, 0, 5, 3],
                    [-2, -3, 0, 3, 2],
                    [-1, -2, 0, 2, 1]
                ]);
            }
        } else {
            switch (n) {
                case 3: return Matrix.fromArray([
                    [1, 2, 1], 
                    [0, 0, 0], 
                    [-1, -2, -1]
                ]);
                case 5: return Matrix.fromArray([
                    [1, 2, 3, 2, 1],
                    [2, 3, 5, 3, 2],
                    [0, 0, 0, 0, 0],
                    [-2, -3, -5, -3, -2],
                    [-1, -2, -3, -2, -1]
                ]);
            }
        }
    }
    // Laplacian Kernel...
}
