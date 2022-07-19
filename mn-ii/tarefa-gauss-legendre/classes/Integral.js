function x_s(ini, fim, s) {
    return (ini + fim + s*(fim - ini)) / 2;
}
class Integral {
    // Calcula a integral com tolerância
    static calculate(metodo, a, b, eps, pontos)  {
        let integralNova = Number.POSITIVE_INFINITY, integralVelha;
        let N = 0.5;
        do {
            N *= 2;
            integralVelha = integralNova;
            integralNova = Integral.calculateWithN(metodo, a, b, N, pontos);
        } while (Math.abs((integralNova - integralVelha) / integralNova) > eps);
        return {valor: integralNova, N};
    }
    // Cacula a integral com N partições
    static calculateWithN(metodo, a, b, N, pontos)  {
        let dx, xi, xf, integral;
        dx = (b - a) / N;
        integral = 0;
        for (let i = 0; i < N; ++i) {
            xi = a + i * dx;
            xf = xi + dx;
            integral += metodo(f, xi, xf, pontos)
        }
        return integral;
    }
}