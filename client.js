// check if elements are already displayed
// if they are then delete them
function checkForExistingElement(nodeInfo) {
  const elements = document.getElementsByTagName("div");
  for (let i = elements.length - 1; i >= 0; i--) {
    const div = elements[i];
    div.parentElement.removeChild(div);
  }
}

// get details of your node and then display them
function displayDetails(data) {
  if (data) {
    const nodeInfo = data;
    checkForExistingElement(data);
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
  } else {
    const container = document.createElement("div");
    container.setAttribute("class", "errorMessage");
    container.appendChild(document.createTextNode("Error: Failed to connect!"));
    document.body.appendChild(container);
  }
}

async function stopNode(node_id) {
  const bodyJson = { node_id: node_id };
  let response = await fetch("http://localhost:8080/node/stop", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(bodyJson),
  });
  let data = await response.json();
  console.log(data);

  displayNodeDetails();
  return data;
}

async function startNode(node_id) {
  const bodyJson = { node_id: node_id };
  let response = await fetch("http://localhost:8080/node/start", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(bodyJson),
  });
  let data = await response.json();
  console.log(data);

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
