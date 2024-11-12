const express = require('express')
const app = express()
const port = 3000

app.use(express.static("Public"));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/Public/index.html'));
  });


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})