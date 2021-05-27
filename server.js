const express = require('express')
const fs = require('fs')

const app = express()

app.get('/', (req, res) => {
  res.end(fs.readFileSync('./index.html', 'utf-8'))
})

app.use(express.static('./'))

app.listen(3000, () => {
  console.log('server is running')
})
