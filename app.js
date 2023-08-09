/** Simple demo Express app. */

const express = require("express");
const app = express();

// process JSON body => req.body
app.use(express.json());

// process traditional form data => req.body
app.use(express.urlencoded());

const { findMean, findMedian, findMode } = require("./stats");

// useful error class to throw
const { NotFoundError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  console.log("get the request", req.query);

  let numsStr = req.query.nums;
  console.log("nums we get", numsStr);
  const nums = numsStr.split(",").map(numStr => Number(numStr));
  console.log("nums are", nums);
  let mean = findMean(nums);

  return res.json({ operation: "mean", value: mean, });
});


/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {

  let numsStr = req.query.nums;
  console.log("nums we get", numsStr);
  const nums = numsStr.split(",").map(numStr => Number(numStr));
  console.log("nums are", nums);
  let median = findMedian(nums);

  return res.json({ operation: "median", value: median, });
});


/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res) {

  let numsStr = req.query.nums;
  console.log("nums we get", numsStr);
  const nums = numsStr.split(",").map(numStr => Number(numStr));
  console.log("nums are", nums);
  let mode = findMedian(nums);

  return res.json({ operation: "mode", value: mode, });
});


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;