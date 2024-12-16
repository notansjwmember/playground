const express = require("express");
const axios = require("axios");
const cors = require("cors");
var qs = require("qs");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const fakerUrl = "https://fakerapi.it/api/v2/companies?_quantity=5";
const chartUrl = "https://quickchart.io/chart";
const codexUrl = "https://api.codex.jaagrav.in";

app.get("/", (req, res) => {
  return res.status(200).send("Hey! What are you doing here?!");
});

app.get("/generate", async (req, res) => {
  try {
    const response = await axios.get(fakerUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.status(200).json(response.data);
  } catch (e) {
    return res.status(500).json({ message: e.message || "An error occurred" });
  }
});

app.post("/chart", async (req, res) => {
  try {
    const response = await axios.post(chartUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(req.body),
    });

    return res.status(200).json(response.data);
  } catch (e) {
    return res.status(500).json({ message: e.message || "An error occurred" });
  }
});

app.post("/compile", async (req, res) => {
  try {
    const { code, lang } = req.body;

    const encodedParams = new URLSearchParams();
    encodedParams.append("code", code);
    encodedParams.append("language", lang);

    const response = await axios.post(codexUrl, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: JSON.stringify(req.body),
    });

    return res.status(200).json(JSON.stringify(response.data));
  } catch (e) {
    return res.status(500).json({ message: e.message || "An error occurred" });
  }
});

app.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});
