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

app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})