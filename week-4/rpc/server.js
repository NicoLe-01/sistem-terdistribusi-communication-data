const express = require('express');
const { parse } = require('querystring');
const cors = require('cors');

const database = {
  1: { id: 1, name: 'John' },
  2: { id: 2, name: 'Jane' },
};

const app = express(); // Create an instance of express

// Apply CORS middleware
app.use(cors());

app.get('/api/users', (req, res) => {
  console.log(`Received GET request: ${req.url}`);

  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(Object.values(database)));
  console.log(database)
});



app.post('/api/users', (req, res) => {
  console.log(`Received POST request: ${req.url}`);

  let data = '';

  req.on('data', chunk => {
    data += chunk;
    console.log(`Data has been write ${data}`)
  });

  req.on('end', () => {
    const newUser = JSON.parse(data);
    database[newUser.id] = newUser;
    console.log(`Data has been added ${data}`)

    res.setHeader('Content-Type', 'application/json');
    res.status(201).send(JSON.stringify(newUser));
  });
});

const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
