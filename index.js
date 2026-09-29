// Add the Calculator APIs

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/main.html'));
});

//your code here
const MAX = 1000000;
const MIN = -1000000;

function validate(num1, num2) {
  if (typeof num1 !== "number" || typeof num2 !== "number") return "Invalid data types";
  if (num1 < MIN || num2 < MIN) return "Underflow";
  if (num1 > MAX || num2 > MAX) return "Overflow";
  return null;
}

function checkResult(value) {
  if (value < MIN) return "Underflow";
  if (value > MAX) return "Overflow";
  return null;
}

function sendError(res, message) {
  return res.status(400).json({ status: "error", message });
}

app.post("/add", (req, res) => {
  const { num1, num2 } = req.body;
  let err = validate(num1, num2);
  if (err) return sendError(res, err);
  const sum = num1 + num2;
  err = checkResult(sum);
  if (err) return sendError(res, err);
  res.json({ status: "success", message: "the sum of given two numbers", sum });
});

app.post("/sub", (req, res) => {
  const { num1, num2 } = req.body;
  let err = validate(num1, num2);
  if (err) return sendError(res, err);
  const difference = num1 - num2;
  err = checkResult(difference);
  if (err) return sendError(res, err);
  res.json({ status: "success", message: "the difference of given two numbers", difference });
});

app.post("/multiply", (req, res) => {
  const { num1, num2 } = req.body;
  let err = validate(num1, num2);
  if (err) return sendError(res, err);
  const result = num1 * num2;
  err = checkResult(result);
  if (err) return sendError(res, err);
  res.json({ status: "success", message: "The product of given numbers", result });
});

app.post("/divide", (req, res) => {
  const { num1, num2 } = req.body;
  let err = validate(num1, num2);
  if (err) return sendError(res, err);
  if (num2 === 0) return sendError(res, "Cannot divide by zero");
  const result = num1 / num2;
  err = checkResult(result);
  if (err) return sendError(res, err);
  res.json({ status: "success", message: "The division of given numbers", result });
});

module.exports = app;