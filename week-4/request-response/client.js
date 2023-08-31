function getData() {
  fetch('http://localhost:5500/api/users', {
    method: 'GET'
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('get-response').textContent = JSON.stringify(data, null, 2);
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

  fetch('http://localhost:5500/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('post-response').textContent = JSON.stringify(data);
  })
  .catch(error => {
    console.error('POST Error:', error);
  });
}
