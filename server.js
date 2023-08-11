const express = require('express');


// Creating express object
const app = express();


// Initiallizing the app port 
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is Running at PORT ${PORT}`)
})