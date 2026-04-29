const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
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

  test("returns the remainder for modulo", () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test("throws on modulo by zero", () => {
    expect(() => modulo(10, 0)).toThrow("Modulo by zero is not allowed.");
  });

  test("raises a base to an exponent", () => {
    expect(power(2, 4)).toBe(16);
  });

  test("computes a square root", () => {
    expect(squareRoot(81)).toBe(9);
  });

  test("throws for square root of a negative number", () => {
    expect(() => squareRoot(-1)).toThrow("Square root of a negative number is not allowed.");
  });
});

describe("calculator extended operations examples", () => {
  test("computes modulo from the example with 5 % 2", () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test("computes power from the example with 2 ^ 3", () => {
    expect(power(2, 3)).toBe(8);
  });

  test("computes square root from the example with sqrt(16)", () => {
    expect(squareRoot(16)).toBe(4);
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
    ["%", "modulo"],
    ["mod", "modulo"],
    ["power", "power"],
    ["pow", "power"],
    ["^", "power"],
    ["sqrt", "squareRoot"],
    ["square root", "squareRoot"],
    ["square-root", "squareRoot"],
  ])('normalizes "%s" to "%s"', (input, expected) => {
    expect(normalizeOperation(input)).toBe(expected);
  });

  test("throws for an unsupported operation", () => {
    expect(() => normalizeOperation("unknown")).toThrow(
      'Unsupported operation "unknown". Use addition, subtraction, multiplication, division, modulo, power, square root.'
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

  test("dispatches modulo aliases", () => {
    expect(calculate("%", 10, 3)).toBe(1);
  });

  test("dispatches the modulo example from the image", () => {
    expect(calculate("%", 5, 2)).toBe(1);
  });

  test("dispatches power aliases", () => {
    expect(calculate("^", 2, 4)).toBe(16);
  });

  test("dispatches the power example from the image", () => {
    expect(calculate("^", 2, 3)).toBe(8);
  });

  test("dispatches square root aliases", () => {
    expect(calculate("sqrt", 81)).toBe(9);
  });

  test("dispatches the square root example from the image", () => {
    expect(calculate("sqrt", 16)).toBe(4);
  });

  test("surfaces division by zero errors", () => {
    expect(() => calculate("/", 8, 0)).toThrow("Division by zero is not allowed.");
  });

  test("surfaces modulo by zero errors", () => {
    expect(() => calculate("%", 8, 0)).toThrow("Modulo by zero is not allowed.");
  });

  test("surfaces square root errors", () => {
    expect(() => calculate("sqrt", -4)).toThrow(
      "Square root of a negative number is not allowed."
    );
  });

  test("throws for unsupported operations", () => {
    expect(() => calculate("unknown", 8, 2)).toThrow(
      'Unsupported operation "unknown". Use addition, subtraction, multiplication, division, modulo, power, square root.'
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

  test("prints the result for square root arguments", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    runCli(["sqrt", "81"]);

    expect(logSpy).toHaveBeenCalledWith(9);
  });

  test("prints the modulo example result from CLI arguments", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    runCli(["%", "5", "2"]);

    expect(logSpy).toHaveBeenCalledWith(1);
  });

  test("prints the power example result from CLI arguments", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    runCli(["^", "2", "3"]);

    expect(logSpy).toHaveBeenCalledWith(8);
  });

  test("prints the square root example result from CLI arguments", () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    runCli(["sqrt", "16"]);

    expect(logSpy).toHaveBeenCalledWith(4);
  });

  test("throws usage instructions when arguments are missing", () => {
    expect(() => runCli(["+"])).toThrow(
      "Usage: node src/calculator.js <operation> <firstNumber> [secondNumber]"
    );
  });

  test("throws usage instructions when binary operations are missing the second number", () => {
    expect(() => runCli(["+", "2"])).toThrow(
      "Usage: node src/calculator.js <operation> <firstNumber> [secondNumber]"
    );
  });

  test("throws usage instructions when square root receives too many arguments", () => {
    expect(() => runCli(["sqrt", "81", "9"])).toThrow(
      "Usage: node src/calculator.js <operation> <firstNumber> [secondNumber]"
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

  test("throws for negative square root from CLI arguments", () => {
    expect(() => runCli(["sqrt", "-9"])).toThrow(
      "Square root of a negative number is not allowed."
    );
  });
});
