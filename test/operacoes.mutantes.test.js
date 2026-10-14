const {
  divisao, raizQuadrada, fatorial, mediaArray, maximoArray, minimoArray,
  isPar, isImpar, isPrimo, produtoArray, clamp, isDivisivel,
  celsiusParaFahrenheit, fahrenheitParaCelsius, inverso, isMaiorQue,
  isMenorQue, isEqual, medianaArray
} = require('../src/operacoes');

// Testes adicionados para matar os mutantes sobreviventes do StrykerJS.
describe('Testes adicionais para matar mutantes', () => {
  describe('Mensagens e condições de erro', () => {
    test('divisao: mensagem de erro para divisor zero', () => {
      expect(() => divisao(5, 0)).toThrow('Divisão por zero não é permitida.');
    });
    test('raizQuadrada: lança erro para negativo e aceita zero', () => {
      expect(() => raizQuadrada(-1)).toThrow('Não é possível calcular a raiz quadrada de um número negativo.');
      expect(raizQuadrada(0)).toBe(0);
    });
    test('fatorial: lança erro para negativo e aceita 0, 1 e 2', () => {
      expect(() => fatorial(-1)).toThrow('Fatorial não é definido para números negativos.');
      expect(fatorial(0)).toBe(1);
      expect(fatorial(1)).toBe(1);
      expect(fatorial(2)).toBe(2);
      expect(fatorial(5)).toBe(120);
    });
    test('mediaArray: array vazio retorna 0', () => {
      expect(mediaArray([])).toBe(0);
    });
    test('maximoArray: array vazio lança erro com mensagem', () => {
      expect(() => maximoArray([])).toThrow('Array vazio не possui valor máximo.');
    });
    test('minimoArray: array vazio lança erro com mensagem', () => {
      expect(() => minimoArray([])).toThrow('Array vazio не possui valor mínimo.');
    });
    test('inverso: zero lança erro com mensagem', () => {
      expect(() => inverso(0)).toThrow('Não é possível inverter o número zero.');
      expect(inverso(-2)).toBe(-0.5);
    });
    test('medianaArray: array vazio lança erro com mensagem', () => {
      expect(() => medianaArray([])).toThrow('Array vazio не possui mediana.');
    });
  });

  describe('Paridade', () => {
    test('isPar: falso para ímpares, verdadeiro para pares', () => {
      expect(isPar(7)).toBe(false);
      expect(isPar(0)).toBe(true);
      expect(isPar(-4)).toBe(true);
    });
    test('isImpar: falso para pares, verdadeiro para ímpares', () => {
      expect(isImpar(100)).toBe(false);
      expect(isImpar(0)).toBe(false);
      expect(isImpar(-3)).toBe(true);
      expect(isImpar(7)).toBe(true);
    });
  });

  describe('isPrimo', () => {
    test('0, 1 e negativos não são primos', () => {
      expect(isPrimo(0)).toBe(false);
      expect(isPrimo(1)).toBe(false);
      expect(isPrimo(-7)).toBe(false);
    });
    test('2 e 3 são primos', () => {
      expect(isPrimo(2)).toBe(true);
      expect(isPrimo(3)).toBe(true);
    });
    test('compostos não são primos', () => {
      expect(isPrimo(4)).toBe(false);
      expect(isPrimo(9)).toBe(false);
      expect(isPrimo(15)).toBe(false);
    });
  });

  describe('produtoArray', () => {
    test('array vazio retorna 1 e produto com zero é zero', () => {
      expect(produtoArray([])).toBe(1);
      expect(produtoArray([5, 0])).toBe(0);
    });
  });

  describe('clamp', () => {
    test('abaixo do mínimo, acima do máximo e nos limites', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
      expect(clamp(0, 0, 10)).toBe(0);
      expect(clamp(10, 0, 10)).toBe(10);
    });
    test('limites distintos de zero distinguem min e max', () => {
      expect(clamp(1, 5, 8)).toBe(5);
      expect(clamp(9, 5, 8)).toBe(8);
      expect(clamp(5, 5, 8)).toBe(5);
      expect(clamp(8, 5, 8)).toBe(8);
    });
  });

  describe('isDivisivel', () => {
    test('retorna falso quando há resto', () => {
      expect(isDivisivel(10, 3)).toBe(false);
      expect(isDivisivel(9, 3)).toBe(true);
    });
  });

  describe('Conversões de temperatura', () => {
    test('celsiusParaFahrenheit com valores não triviais', () => {
      expect(celsiusParaFahrenheit(100)).toBe(212);
      expect(celsiusParaFahrenheit(-40)).toBe(-40);
      expect(celsiusParaFahrenheit(10)).toBe(50);
    });
    test('fahrenheitParaCelsius com valores não triviais', () => {
      expect(fahrenheitParaCelsius(212)).toBe(100);
      expect(fahrenheitParaCelsius(-40)).toBe(-40);
      expect(fahrenheitParaCelsius(50)).toBe(10);
    });
  });

  describe('Comparações', () => {
    test('isMaiorQue: falso para menor e para igual', () => {
      expect(isMaiorQue(5, 10)).toBe(false);
      expect(isMaiorQue(5, 5)).toBe(false);
    });
    test('isMenorQue: falso para maior e para igual', () => {
      expect(isMenorQue(10, 5)).toBe(false);
      expect(isMenorQue(5, 5)).toBe(false);
    });
    test('isEqual: falso para diferentes', () => {
      expect(isEqual(7, 8)).toBe(false);
      expect(isEqual(7, 7)).toBe(true);
    });
  });

  describe('medianaArray', () => {
    test('ordena o array antes de calcular (ímpar desordenado)', () => {
      expect(medianaArray([5, 1, 3])).toBe(3);
      expect(medianaArray([10, 9, 100, 1, 2])).toBe(9);
    });
    test('ordenação numérica, não lexicográfica', () => {
      expect(medianaArray([10, 9, 8])).toBe(9);
    });
    test('tamanho par retorna a média dos dois centrais', () => {
      expect(medianaArray([1, 2, 3, 4])).toBe(2.5);
      expect(medianaArray([4, 1, 3, 2])).toBe(2.5);
      expect(medianaArray([1, 3])).toBe(2);
    });
    test('não altera o array original', () => {
      const original = [3, 1, 2];
      medianaArray(original);
      expect(original).toEqual([3, 1, 2]);
    });
  });
});
