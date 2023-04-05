const express = require("express");
let bodyparser = require("body-parser");
const app = express();

// Add CORS to allow requests from out client on localhost
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyparser.json());

// Use dotenv file for storing backend secrets like API key
const dotenv = require("dotenv");
dotenv.config();

// allows serving of the JS file
app.use(express.static(__dirname));

// index page endpoint that returns the html file
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/node/stop", async (req, res) => {
  console.log("received stop command");
  console.log(req.body);
  const payload = { node_id: req.body["node_id"] };
  const endpoint = new URL("https://api.voltage.cloud/node/stop");
  const API_KEY = process.env.VOLTAGE_API_KEY;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "X-VOLTAGE-AUTH": API_KEY,
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  console.log(data);
  res.send(data);
});

app.post("/node/delete", async (req, res) => {
  console.log("received delete command");
  console.log(req.body);
  const payload = { node_id: req.body["node_id"] };
  const endpoint = new URL("https://api.voltage.cloud/node/delete");
  const API_KEY = process.env.VOLTAGE_API_KEY;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "X-VOLTAGE-AUTH": API_KEY,
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  console.log(data);
  res.send(data);
});

app.post("/node/start", async (req, res) => {
  console.log("received start command");
  console.log(req.body);
  const payload = { node_id: req.body["node_id"] };
  const endpoint = new URL("https://api.voltage.cloud/node/start");
  const API_KEY = process.env.VOLTAGE_API_KEY;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "X-VOLTAGE-AUTH": API_KEY,
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  console.log(data);
  res.send(data);
});

app.post("/node/name", async (req, res) => {
  console.log("received name command");
  console.log(req.body);
  const payload = {
    node_name: req.body["node_name"],
    network: req.body["network"],
  };
  const endpoint = new URL("https://api.voltage.cloud/node/name");
  const API_KEY = process.env.VOLTAGE_API_KEY;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "X-VOLTAGE-AUTH": API_KEY,
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  console.log(data);
  res.send(data);
});

app.post("/node/create", async (req, res) => {
  console.log("received create command");
  console.log(req.body);
  const payload = req.body;
  const endpoint = new URL("https://api.voltage.cloud/node/create");
  const API_KEY = process.env.VOLTAGE_API_KEY;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "X-VOLTAGE-AUTH": API_KEY,
      "Content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  console.log(data);
  res.send(data);
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
    return data.nodes;
  } else {
    return null;
  }
}

// start the application
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
