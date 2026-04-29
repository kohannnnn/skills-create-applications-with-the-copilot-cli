#!/usr/bin/env node

/**
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 * - modulo
 * - power
 * - square root
 */

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(n);
}

const OPERATION_ALIASES = Object.freeze({
  addition: "addition",
  add: "addition",
  "+": "addition",
  subtraction: "subtraction",
  subtract: "subtraction",
  "-": "subtraction",
  multiplication: "multiplication",
  multiply: "multiplication",
  "*": "multiplication",
  x: "multiplication",
  division: "division",
  divide: "division",
  "/": "division",
  modulo: "modulo",
  mod: "modulo",
  "%": "modulo",
  power: "power",
  pow: "power",
  exponentiation: "power",
  "^": "power",
  squareroot: "squareRoot",
  "square root": "squareRoot",
  "square-root": "squareRoot",
  sqrt: "squareRoot",
});

const SUPPORTED_OPERATION_NAMES = Object.freeze([
  "addition",
  "subtraction",
  "multiplication",
  "division",
  "modulo",
  "power",
  "square root",
]);

function normalizeOperation(operation) {
  const normalizedOperation = OPERATION_ALIASES[String(operation).toLowerCase()];

  if (!normalizedOperation) {
    throw new Error(
      `Unsupported operation "${operation}". Use ${SUPPORTED_OPERATION_NAMES.join(", ")}.`
    );
  }

  return normalizedOperation;
}

function parseNumber(value, label) {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid ${label}: "${value}" is not a number.`);
  }

  return parsedValue;
}

function calculate(operation, a, b) {
  switch (normalizeOperation(operation)) {
    case "addition":
      return addition(a, b);
    case "subtraction":
      return subtraction(a, b);
    case "multiplication":
      return multiplication(a, b);
    case "division":
      return division(a, b);
    case "modulo":
      return modulo(a, b);
    case "power":
      return power(a, b);
    case "squareRoot":
      return squareRoot(a);
    default:
      throw new Error(`Unsupported operation "${operation}".`);
  }
}

function formatUsage() {
  return [
    "Usage: node src/calculator.js <operation> <firstNumber> [secondNumber]",
    "",
    "Supported operations: addition (+), subtraction (-), multiplication (*), division (/), modulo (%), power (^), square root (sqrt)",
  ].join("\n");
}

function runCli(args) {
  if (args.length < 2 || args.length > 3) {
    throw new Error(formatUsage());
  }

  const [operation, firstValue, secondValue] = args;
  const normalizedOperation = normalizeOperation(operation);
  const firstNumber = parseNumber(firstValue, "first number");
  let result;

  if (normalizedOperation === "squareRoot") {
    if (args.length !== 2) {
      throw new Error(formatUsage());
    }

    result = squareRoot(firstNumber);
  } else {
    if (args.length !== 3) {
      throw new Error(formatUsage());
    }

    const secondNumber = parseNumber(secondValue, "second number");
    result = calculate(normalizedOperation, firstNumber, secondNumber);
  }

  console.log(result);
}

if (require.main === module) {
  try {
    runCli(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
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
};
