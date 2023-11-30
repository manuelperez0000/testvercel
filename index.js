const express = require('express');
const app = express();
const dbConnect = require('./dbConnection');
const cors = require('cors')
const routerApi = require('./network/routerApi');
app.use(cors())
dbConnect();
app.use(express.json())
app.get('/',(req,res) =>{
    res.send("Welcome")
  })
const PORT = process.env.PORT || 3000;

routerApi(app)

app.listen(PORT, () => console.log('listening on port', PORT))