const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({
  origin: '*',
}));

const fakerUrl = "https://fakerapi.it/api/v2/companies?_quantity=5";
const chartUrl = "https://quickchart.io/chart"

app.get('/', (req, res) => {
  return res.status(200).send('Hey! What are you doing here?!');
});

app.get('/generate', async (req, res) => {
  try {
    const response = await axios.get(fakerUrl, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    return res.status(200).json(response.data);
  } catch (e) {
    return res.status(500).json({message: e.message || "An error occurred"});
  }
});

app.post('/chart', async (req, res) => {
  try {
    const response = await axios.post(chartUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    console.log(response.data)
    return res.status(200).json(response.data);
  } catch (e) {
    return res.status(500).json({message: e.message || "An error occurred"});
  }
})

app.listen(8080, () => {
  console.log('Server started on http://localhost:8080');
});
