#!/usr/bin/env node

/**
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
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
});

function normalizeOperation(operation) {
  const normalizedOperation = OPERATION_ALIASES[String(operation).toLowerCase()];

  if (!normalizedOperation) {
    throw new Error(
      `Unsupported operation "${operation}". Use addition, subtraction, multiplication, or division.`
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
    default:
      throw new Error(`Unsupported operation "${operation}".`);
  }
}

function formatUsage() {
  return [
    "Usage: node src/calculator.js <operation> <firstNumber> <secondNumber>",
    "",
    "Supported operations: addition (+), subtraction (-), multiplication (*), division (/)",
  ].join("\n");
}

function runCli(args) {
  if (args.length !== 3) {
    throw new Error(formatUsage());
  }

  const [operation, firstValue, secondValue] = args;
  const firstNumber = parseNumber(firstValue, "first number");
  const secondNumber = parseNumber(secondValue, "second number");
  const result = calculate(operation, firstNumber, secondNumber);

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
  calculate,
  normalizeOperation,
  parseNumber,
  runCli,
};
