const express = require('express'); // Express 
require("./db/mongoose");


// Creating express object
const app = express();



// middleware body parser
app.use(express.json({extended:false}))

// Define Routes
app.use('/api/users',require('./router/user'));
app.use('/api/auth',require('./router/auth'));
app.use('/api/characters',require('./router/character'));
//app.use('/api/relations',require('./routes/api/relation'));





// Initiallizing the app port 
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is Running at PORT ${PORT}`)
})