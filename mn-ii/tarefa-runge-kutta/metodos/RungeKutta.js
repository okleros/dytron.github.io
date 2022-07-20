var deltaT;

function F(SAnt) {
  return {
    v: -g - 1 * (k / m) * SAnt.v,
    y: SAnt.v,
  };
}

//_
//S i + 1/2
function SApprox_iPlusHalf(SAnt) {
  return {
    v: SAnt.v + (deltaT / 2) * F(SAnt).v,
    y: SAnt.y + (deltaT / 2) * F(SAnt).y,
  };
}

function F2(SAnt) {
  let SAppIHalf = SApprox_iPlusHalf(SAnt);
  return F(SAppIHalf);
}

function SApprox_iPlusOne(SAnt) {
  let FAnt = F(SAnt);
  let SAppIHalf = SApprox_iPlusHalf(SAnt);

  return {
    v: SAnt.v + deltaT * (-FAnt.v + 2 * SAppIHalf.v),
    y: SAnt.y + deltaT * (-FAnt.y + 2 * SAppIHalf.y),
  };
}

function F3(SAnt) {
  let SAppIPlus = SApprox_iPlusOne(SAnt);
  return F(SAppIPlus);
}

function SNext(SAnt) {
  return {
    v:
      SAnt.v +
      deltaT *
        ((1 / 6) * F(SAnt).v + (4 / 6) * F2(SAnt).v + (1 / 6) * F3(SAnt).v),
    y:
      SAnt.y +
      deltaT *
        ((1 / 6) * F(SAnt).y + (4 / 6) * F2(SAnt).y + (1 / 6) * F3(SAnt).y),
  };
}

/**
 * 
 * @param {Number} v0 Velocidade inicial
 * @param {Number} y0 Posição inicial
 * @param {Number} K Constante
 * @param {Number} M Massa
 * @param {Number} G Gravidade
 * @param {Number} TF Tempo Final
 * @param {Array} DTs Lista de delta T
 * @returns {Array} Tabela Resultado
 */
function RangeKutta(v0, y0, K, M, G, TF, DTs) {
    
    k = K;
    m = M;
    g = G;

    let resultTable = [];

    DTs.forEach(DT => {

        deltaT = DT;

        let state = { v: v0, y: y0 };
        let prev,
        time = 0;

        // TEMPO FINAL DA SIMULAÇÃO
        let tf = TF;

        // QUANTIDADE DE ITERAÇÕES
        let n = tf / deltaT;
        let maxY = y0;
        let maxReached = false;
        let maxTime;
        let oceanTime;
        let oceanSpeed;

        for (let i = 0; i < n; i++) {
            prev = state;
            state = SNext(state);
            time += deltaT;

            // Esse if considera que o objeto possui apenas um apice na trajetoria
            if (state.y < maxY) maxReached = true;
            maxY = Math.max(maxY, state.y);

            if (prev.y > 0 && state.y < 0) {
                oceanTime = time - deltaT;
                oceanSpeed = prev.v;
            }

            if (!maxReached) {
                maxTime = time;
            }
            // console.log(state.y, time, state.v);
        }
        resultTable.push([
            deltaT,
            maxY,
            maxTime,
            oceanTime,
            oceanSpeed
        ]);
        console.table(state);
        console.log("A altura maxima foi de " + maxY);
        console.log("O tempo na altura maxima foi " + maxTime);
        console.log("O tempo total até a queda no mar foi " + oceanTime);
        console.log("A velocidade no momento do impacto com o mar foi " + oceanSpeed);
    });
    return resultTable;
}

// while (time <= 10) {
//   prev = state;
//   state = SNext(state);
//   time += deltaT;
//   console.log(time);
// }

// console.table(state);
// console.table(prev);
// console.log("Tempo final antes de entrar na agua: " + time);
