const express = require("express");
const app = express();

// allows serving of the JS file
app.use(express.static(__dirname));

// index page endpoint that returns the html file
app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// endpoint that returns json of your lighning node
// will be required later on
app.get("/getNodeInfo", async (req, res) => {
  getNodeDetails().then((data) => {
    return res.send(data);
  });
});

// call voltage API and request data about your lightning node
async function getNodeDetails() {
  const endpoint = new URL("https://api.voltage.cloud/node");
  const API_KEY = process.env.VOLTAGE_API_KEY; // <------- insert your API key
  const response = await fetch(endpoint, {
    headers: {
      "X-VOLTAGE-AUTH": API_KEY,
    },
  });
  const data = await response.json();
  return data.nodes[0];
}

// get details of your node and then display them
async function displayDetails() {
  getNodeDetails().then((data) => {
    const nodeInfo = data;
    checkForExistingElement(data);
    for (var key in nodeInfo) {
      const node = document.createElement("div");
      node.setAttribute("id", key);
      var textnode = document.createTextNode(key + ": " + nodeInfo[key]);
      node.appendChild(textnode);
      document.body.appendChild(node);
    }
  });
}

// check if elements are already displayed
// if they are then delete them
function checkForExistingElement(nodeInfo) {
  const elements = document.getElementsByTagName("div");
  for (let i = elements.length - 1; i >= 0; i--) {
    const div = elements[i];
    div.parentElement.removeChild(div);
  }
}

// start the application
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
