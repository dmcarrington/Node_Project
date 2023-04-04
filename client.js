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
}

// Helper funtion to fetch JSON response from our server
async function fetchAsync(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

// Fetch node details over API via our local server, and update the display
async function displayNodeDetails() {
  fetchAsync("http://localhost:8080/getNodeInfo").then((data) => {
    displayDetails(data);
  });
}
