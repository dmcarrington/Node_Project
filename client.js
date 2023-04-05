// check if elements are already displayed
// if they are then delete them
function checkForExistingElement(nodeInfo) {
  const elements = document.getElementsByClassName("nodeContainer");
  for (let i = elements.length - 1; i >= 0; i--) {
    const div = elements[i];
    div.parentElement.removeChild(div);
  }
}

// get details of your node and then display them
function displayDetails(data) {
  if (data) {
    checkForExistingElement(data);
    data.forEach((node) => {
      const nodeInfo = node;
      const container = document.createElement("div");
      container.setAttribute("class", "nodeContainer");
      document.body.appendChild(container);
      for (var key in nodeInfo) {
        const node = document.createElement("div");
        node.setAttribute("id", key);

        // Attribute key in bold
        var keySpan = document.createElement("span");
        keySpan.style.fontWeight = "bold";
        keySpan.appendChild(document.createTextNode(key + ": "));

        // Attribute value in regular text
        var textSpan = document.createElement("span");
        textSpan.appendChild(document.createTextNode(nodeInfo[key]));
        node.appendChild(keySpan);
        node.appendChild(textSpan);
        container.appendChild(node);
      }
      // update the node state based on the "status" element
      const status = nodeInfo["status"];
      var controlBtn = document.createElement("BUTTON");
      let action = "Start";
      let onclick = "startNode('" + nodeInfo["node_id"] + "')";
      if (status === "running") {
        action = "Stop";
        onclick = "stopNode('" + nodeInfo["node_id"] + "')";
      } else if (status === "stopping") {
        action = "Node Stopping";
      } else if (status === "starting") {
        action = "Node Starting";
      } else if (status === "waiting_unlock") {
        action = "Node awaiting unlock!";
      }
      controlBtn.appendChild(document.createTextNode(action));
      controlBtn.setAttribute("class", status);
      controlBtn.setAttribute("onclick", onclick);
      container.appendChild(controlBtn);
    });
  } else {
    const container = document.createElement("div");
    container.setAttribute("class", "errorMessage");
    container.appendChild(document.createTextNode("Error: Failed to connect!"));
    document.body.appendChild(container);
  }
}

// Stop the specified node
async function stopNode(node_id) {
  const bodyJson = { node_id: node_id };
  let response = await fetch("http://localhost:8080/node/stop", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(bodyJson),
  });
  let data = await response.json();

  displayNodeDetails();
  return data;
}

// Start the specified node - note it will need to be unlocked via Voltage
async function startNode(node_id) {
  const bodyJson = { node_id: node_id };
  let response = await fetch("http://localhost:8080/node/start", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(bodyJson),
  });
  let data = await response.json();

  displayNodeDetails();
  return data;
}

// Helper funtion to fetch JSON response from our server
async function fetchAsync(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

// Fetch node details over API via our local server, and update the display
async function displayNodeDetails() {
  fetchAsync("http://localhost:8080/getNodeInfo").then((data) => {
    displayDetails(data);
  });
}

// General function to check whether a given node name is available on the selected network
async function getNodeName(name, network) {
  const bodyJson = { node_name: name, network: network };
  let data = null;
  try {
    let response = await fetch("http://localhost:8080/node/name", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(bodyJson),
    });
    data = await response.json();
  } catch (error) {
    console.log("error communicating with local server");
  }
  return data;
}

// Check whether the new name entered in the text box in the action bar is available, and display the result
async function checkNodeName() {
  const name = document.getElementsByName("nodename")[0].value;
  // For this function assume we are only interested in mainnet
  const data = await getNodeName(name, "mainnet");

  let container = document.getElementsByName("nodenamecheck")[0];
  // Delete any existing result text
  const element = document.getElementsByName("resultSpan")[0];
  if (element) {
    element.parentNode.removeChild(element);
  }
  let resultSpan = document.createElement("span");
  resultSpan.setAttribute("name", "resultSpan");
  if (data) {
    const taken = data["taken"];
    if (taken) {
      resultSpan.setAttribute("class", "taken");
      resultSpan.appendChild(
        document.createTextNode("Sorry, " + name + " is already taken")
      );
    } else {
      resultSpan.setAttribute("class", "available");
      resultSpan.appendChild(
        document.createTextNode(name + " is still available")
      );
    }
  } else {
    resultSpan.setAttribute("class", "taken");
    resultSpan.appendChild(document.createTextNode("Error fetching data"));
  }
  container.appendChild(resultSpan);
}

// Display the dialog to create a new node
function createNodeDialog() {
  const dialog = document.getElementById("createNodeDialog");
  dialog.showModal();
}

// Close the node creation dialog
function closeModal() {
  const dialog = document.getElementById("createNodeDialog");
  dialog.close();
}

// Execute the creation of the new node, using the params entered
async function confirmNewNode() {
  const name = document.getElementsByName("createNodeName")[0].value;
  const network = document.getElementsByName("createNodeNetwork")[0].value;
  const purchased_type = document.getElementsByName("purchasedType")[0].value;
  const type = document.getElementsByName("nodeType")[0].value;
  const settings = {
    autopilot: true,
    grpc: true,
    rest: true,
    keysend: true,
    whitelist: ["1.1.1.1", "2.2.2.2"],
    alias: name,
    color: "#EF820D",
  };
  bodyJson = {
    name: name,
    network: network,
    purchased_type: purchased_type,
    type: type,
    settings: settings,
  };
  let data = null;
  try {
    let response = await fetch("http://localhost:8080/node/create", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(bodyJson),
    });
    data = await response.json();
    // TODO: handle failure to create the node
  } catch (error) {
    console.log("error communicating with local server");
  }
  displayNodeDetails();
}

// Check whether the name for the new node is available on the selected network
async function indicateNewNameAvailable() {
  const name = document.getElementsByName("createNodeName")[0].value;
  const network = document.getElementsByName("createNodeNetwork")[0].value;
  const data = await getNodeName(name, network);
  let container = document.getElementsByName("nameStatus")[0];

  // Delete any existing result text
  const element = document.getElementsByName("createResultSpan")[0];
  if (element) {
    element.parentNode.removeChild(element);
  }
  let resultSpan = document.createElement("span");
  resultSpan.setAttribute("name", "createResultSpan");
  if (data) {
    const taken = data["taken"];
    if (taken) {
      resultSpan.setAttribute("class", "taken");
      resultSpan.appendChild(
        document.createTextNode("Sorry, " + name + " is already taken")
      );
    } else {
      resultSpan.setAttribute("class", "available");
      resultSpan.appendChild(
        document.createTextNode(name + " is still available")
      );
    }
  } else {
    resultSpan.setAttribute("class", "taken");
    resultSpan.appendChild(document.createTextNode("Error fetching data"));
  }
  container.appendChild(resultSpan);
}
