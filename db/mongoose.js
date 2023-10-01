const mongoose = require("mongoose"); // DATABASE CONNECTION

// MongoDB Connection String
const mongoURI = <ConnectionStringFromaAtlas>

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connection succesful`);
  })
  .catch((e) => {
    console.log(e);
  });

