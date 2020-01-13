const express = require('express')
const app = express()
const port = 9000
const model = require('./model.json')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors())

app.get('/:id', (req, res) => res.send(model.acntData.slice(0,req.params.id)));

app.post('/load', (req, res) => res.send(model.acntData.slice(0,req.body.loadCount)));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
