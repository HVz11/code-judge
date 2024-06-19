import { Request, Response } from "express";
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");
const cors = require("cors");
const mongoose = require("mongoose");
const Problem = require("../src/models/Problem");
const Job = require("./models/Job");

const app = express();

app.use(express.json());
app.use(cors());

const DB = process.env.MONGODB_URL;
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected.");
  })
  .catch((err: any) => {
    console.log("Database error");
    console.log(err);
  });

app.post("/run", async (req: Request, res: Response) => {
  let { language = "cpp", code, userInput } = req.body as any;

  if (code === undefined || !code) {
    return res.status(400).json({ success: false, error: "Empty code body!" });
  }

  let output;
  let job;

  try {
    // need to generate a c++ file with content from the request
    const filepath = await generateFile(language, code);

    job = await Job({ language, filepath }).save();
    const jobId = job["_id"];
    res.status(201).json({ success: true, jobId });
    job["startedAt"] = new Date();
    if (language === "cpp" || language === "c")
      output = await executeCpp(filepath, userInput);
    else output = await executePy(filepath, userInput);

    job["completedAt"] = new Date();
    job["status"] = "success";
    job["output"] = output;

    await job.save();
  } catch (err) {
    job["completedAt"] = new Date();
    job["status"] = "error";
    job["output"] = err;
    await job.save();
    console.log(err);
    res.status(500).json({ err, success: false });
  }
});

app.get("/status/:id", async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json("Missing required fields");
  }

  try {
    const job = await Job.findById(req.params.id);

    res.status(200).json({ job, success: true });
  } catch (error) {
    res.status(500).json({ error, success: false });
  }
});

app.post("/add", async (req: Request, res: Response) => {
  const { testcase, detail } = req.body;

  if (!testcase || !detail) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const data = { ...detail, testcase: [...testcase] };

  try {
    const newProblem = new Problem(data);

    const saved = await newProblem.save();

    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.get("/problems", async (req: Request, res: Response) => {
  try {
    const data = await Problem.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.get("/problems/:id", async (req: Request, res: Response) => {
  try {
    const data = await Problem.findById(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is listening"));
