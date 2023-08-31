// Define metrics objects to store measurement data
const metrics = {
  getRequestCount: 0,
  postRequestCount: 0,
  totalRequestCount: 0,
  totalResponseTime: 0,
};

// Function to measure response time and update metrics
function measureResponseTime(startTime) {
  const endTime = performance.now();
  const responseTime = endTime - startTime;
  metrics.totalResponseTime += responseTime;
}

function getData() {
  console.log("User do GET request")
  const startTime = performance.now();
  metrics.getRequestCount++;

  fetch('http://localhost:5500/api/users', {
    method: 'GET'
  })
    .then(response => {
      measureResponseTime(startTime)
      return response.json()
    })
    .then(data => {
      document.getElementById('get-response').textContent = JSON.stringify(data, null, 2)
    })
    .catch(error => {
      console.error('GET Error:', error);
    });
}

function postData() {
  const newUser = {
    id: document.getElementById('id').value,
    name: document.getElementById('name').value
  };

  const startTime = performance.now();
  metrics.postRequestCount++;

  fetch('http://localhost:5500/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
    .then(response => {
      measureResponseTime(startTime)
      return response.json()
    })
    .then(response => {
      document.getElementById('post-response').textContent = JSON.stringify(response);
    })
    .catch(error => {
      console.error('POST Error:', error);
    });
}

// Function to display metrics
function displayMetrics() {
  const metricsDisplay = `
    Total GET Requests: ${metrics.getRequestCount}
    Total POST Requests: ${metrics.postRequestCount}
    Total Requests: ${metrics.getRequestCount + metrics.postRequestCount}
    Average Response Time: ${metrics.totalResponseTime / (metrics.getRequestCount + metrics.postRequestCount)} ms
  `;

  document.getElementById('metrics').textContent = metricsDisplay;
}
