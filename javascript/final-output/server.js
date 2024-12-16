const express = require("express");
const axios = require("axios");
const cors = require("cors");
const QuickChart = require("quickchart-js");
var qs = require("qs");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const fakerUrl = "https://fakerapi.it/api/v2/companies?_quantity=3";
const codexUrl = "https://api.codex.jaagrav.in";
const colorUrl = "https://color.serialif.com/";

app.get("/", (req, res) => {
  return res.status(200).send("Hey! What are you doing here?!");
});

app.get("/faker", async (req, res) => {
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
  const payload = req.body;

  try {
    const myChart = new QuickChart();
    myChart.setConfig(payload).setWidth(600).setHeight(400).setBackgroundColor("white");

    return res.status(200).json({ message: "success", url: myChart.getUrl() });
  } catch (e) {
    return res.status(500).json({ message: e.message || "An error occurred" });
  }
});

app.post("/color", async (req, res) => {
  const { color } = req.body;

  try {
    const response = await axios.get(`${colorUrl}/${color}`);

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
