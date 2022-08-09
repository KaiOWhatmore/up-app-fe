const express = require('express')
const cors = require('cors') 
const app = express()
const unirest = require("unirest")
const port = 3001;

app.use(cors()) 

app.get('/api/transactions', (req, res) => {
    const request = unirest("GET", "http://localhost:8082/transactions");
    request.end(function (response) {
        if (response.error) throw new Error(response.error);

        res.json(response.body || {});
    })
  });

app.get('/api/transactions/categories', (req, res) => {
  const request = unirest("GET", "http://localhost:8082/transactions/categories");
  request.end(function (response) {
      if (response.error) throw new Error(response.error);

      res.json(response.body || {});
  })
});

app.get('/api/transactions/monthly-savings', (req, res) => {
  const request = unirest("GET", "http://localhost:8082/transactions/monthly-savings");
  request.end(function (response) {
      if (response.error) throw new Error(response.error);

      res.json(response.body || {});
  })
});

app.get('/api/transactions/monthly-income', (req, res) => {
  const request = unirest("GET", "http://localhost:8082/transactions/monthly-income");
  request.end(function (response) {
      if (response.error) throw new Error(response.error);

      res.json(response.body || {});
  })
});

app.get('/api/transactions/monthly-expenses', (req, res) => {
  const request = unirest("GET", "http://localhost:8082/transactions/monthly-expenses");
  request.end(function (response) {
      if (response.error) throw new Error(response.error);

      res.json(response.body || {});
  })
});

app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})