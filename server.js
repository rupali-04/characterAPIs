const express = require('express'); // Express 
require("./db/mongoose");


// Creating express object
const app = express();

const cors = require("cors");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());






// Initiallizing the app port 
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is Running at PORT ${PORT}`)
})