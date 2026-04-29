const {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
  normalizeOperation,
  parseNumber,
  runCli,
} = require("../calculator");

describe("calculator basic operations", () => {
  test("adds numbers from the example", () => {
    expect(addition(2, 3)).toBe(5);
  });

  test("subtracts numbers from the example", () => {
    expect(subtraction(10, 4)).toBe(6);
  });

  test("multiplies numbers from the example", () => {
    expect(multiplication(45, 2)).toBe(90);
  });

  test("divides numbers from the example", () => {
    expect(division(20, 5)).toBe(4);
  });
});

describe("calculator arithmetic edge cases", () => {
  test("adds negative and decimal values", () => {
    expect(addition(-5, 2.5)).toBe(-2.5);
  });

  test("subtracts to a negative result", () => {
    expect(subtraction(3, 8)).toBe(-5);
  });

  test("multiplies by zero", () => {
    expect(multiplication(999, 0)).toBe(0);
  });

  test("divides negative values", () => {
    expect(division(-12, 3)).toBe(-4);
  });

  test("throws on division by zero", () => {
    expect(() => division(20, 0)).toThrow("Division by zero is not allowed.");
  });
});

describe("normalizeOperation", () => {
  test.each([
    ["addition", "addition"],
    ["ADD", "addition"],
    ["+", "addition"],
    ["subtract", "subtraction"],
    ["-", "subtraction"],
    ["multiply", "multiplication"],
    ["x", "multiplication"],
    ["/", "division"],
    ["divide", "division"],
  ])('normalizes "%s" to "%s"', (input, expected) => {
    expect(normalizeOperation(input)).toBe(expected);
  });

  test("throws for an unsupported operation", () => {
    expect(() => normalizeOperation("power")).toThrow(
      'Unsupported operation "power". Use addition, subtraction, multiplication, or division.'
    );
  });
});

describe("parseNumber", () => {
  test("parses numeric strings", () => {
    expect(parseNumber("42.5", "value")).toBe(42.5);
  });

  test("parses whitespace-padded values", () => {
    expect(parseNumber(" 7 ", "value")).toBe(7);
  });

  test("throws for invalid numbers", () => {
    expect(() => parseNumber("abc", "first number")).toThrow(
      'Invalid first number: "abc" is not a number.'
    );
  });
});

describe("calculate", () => {
  test("dispatches addition aliases", () => {
    expect(calculate("+", 8, 2)).toBe(10);
  });

  test("dispatches subtraction aliases", () => {
    expect(calculate("subtract", 8, 2)).toBe(6);
  });

  test("dispatches multiplication aliases", () => {
    expect(calculate("x", 8, 2)).toBe(16);
  });

  test("dispatches division aliases", () => {
    expect(calculate("division", 8, 2)).toBe(4);
  });

  test("surfaces division by zero errors", () => {
    expect(() => calculate("/", 8, 0)).toThrow("Division by zero is not allowed.");
  });

  test("throws for unsupported operations", () => {
    expect(() => calculate("modulo", 8, 2)).toThrow(
      'Unsupported operation "modulo". Use addition, subtraction, multiplication, or division.'
    );
  });
});

describe("runCli", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("prints the result for valid arguments", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    runCli(["+", "2", "3"]);

    expect(logSpy).toHaveBeenCalledWith(5);
  });

  test("throws usage instructions when arguments are missing", () => {
    expect(() => runCli(["+", "2"])).toThrow(
      "Usage: node src/calculator.js <operation> <firstNumber> <secondNumber>"
    );
  });

  test("throws when the first number is invalid", () => {
    expect(() => runCli(["+", "two", "3"])).toThrow(
      'Invalid first number: "two" is not a number.'
    );
  });

  test("throws when the second number is invalid", () => {
    expect(() => runCli(["+", "2", "three"])).toThrow(
      'Invalid second number: "three" is not a number.'
    );
  });

  test("throws for division by zero from CLI arguments", () => {
    expect(() => runCli(["/", "20", "0"])).toThrow("Division by zero is not allowed.");
  });
});
