const express = require("express");
const app = express();

// Add CORS to allow requests from out client on localhost
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Use dotenv file for storing backend secrets like API key
const dotenv = require("dotenv");
dotenv.config();

// allows serving of the JS file
app.use(express.static(__dirname));

// index page endpoint that returns the html file
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// endpoint that returns json of your lighning node
// will be required later on
app.get("/getNodeInfo", async (req, res) => {
  let data = await getNodeDetails();
  if (data) {
    return res.send(data);
  } else {
    res.status(500).send("no nodes found, check your API key");
  }
});

// call voltage API and request data about your lightning node
async function getNodeDetails() {
  const endpoint = new URL("https://api.voltage.cloud/node");
  const API_KEY = process.env.VOLTAGE_API_KEY;
  const response = await fetch(endpoint, {
    headers: {
      "X-VOLTAGE-AUTH": API_KEY,
    },
  });
  const data = await response.json();
  if (data.nodes) {
    return data.nodes[0];
  } else {
    return null;
  }
}

// start the application
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
