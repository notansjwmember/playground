const express = require("express");
const axios = require("axios");
const cors = require("cors");
const qs = require("qs");
const QuickChart = require("quickchart-js");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const fakerUrl = "https://fakerapi.it/api/v2/persons?_quantity=3";
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
    return res.status(500).json({message: e.message || "An error occurred"});
  }
});

app.post("/chart", async (req, res) => {
  const payload = req.body;

  try {
    const myChart = new QuickChart();
    myChart.setConfig(payload).setWidth(700).setHeight(400).setBackgroundColor("white");

    return res.status(200).json({message: "success", url: myChart.getUrl()});
  } catch (e) {
    return res.status(500).json({message: e.message || "An error occurred"});
  }
});

app.post("/color", async (req, res) => {
  const {color} = req.body;

  try {
    const response = await axios.get(`${colorUrl}/${color}`);

    return res.status(200).json(response.data);
  } catch (e) {
    return res.status(500).json({message: e.message || "An error occurred"});
  }
});

const judgeUrl = 'https://judge0-ce.p.rapidapi.com/submissions';

async function getCompiledData(token) {
  const options = {
    method: 'GET',
    url: `${judgeUrl}/${token}`,
    params: {
      base64_encoded: 'true',
      fields: '*'
    },
    headers: {
      'x-rapidapi-key': '68eb56b87bmsh49ee75de14e51e2p18dabcjsnf5bca19d76ff',
      'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch the compilation result');
  }
}

app.post("/compile", async (req, res) => {
  const code = req.body.code;
  const language = req.body.language;

  const data = qs.stringify({
    source_code: code,
    language_id: language,
    stdin: '',
    timeout: 5,
    memory_limit: 128000,
  });

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'x-rapidapi-key': '68eb56b87bmsh49ee75de14e51e2p18dabcjsnf5bca19d76ff',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
  };

  try {
    const response = await axios.post(judgeUrl, data, {headers});
    const {token} = response.data;
    console.log('Token received:', token);

    let result;
    let status = null;

    while (status !== 3) {
      console.log('Waiting for result...');
      result = await getCompiledData(token);
      status = result.status.id;

      if (status !== 3) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    if (result.status.id === 3) {
      const decodedOutput = Buffer.from(result.stdout || '', 'base64').toString('utf-8');

      return res.status(200).json({
        message: 'Compilation and execution successful',
        output: decodedOutput,
        error: result.stderr ? Buffer.from(result.stderr, 'base64').toString('utf-8') : null,
      });
    } else {
      return res.status(500).json({message: 'Execution failed', error: result.stderr});
    }
  } catch
    (e) {
    console.error(e.message || e);
    return res.status(500).json({message: e.message || 'An error occurred'});
  }
})
;

app.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});
