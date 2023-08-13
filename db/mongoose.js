const mongoose = require("mongoose"); // DATABASE CONNECTION

// MongoDB Connection String
const mongoURI = "mongodb+srv://admin:admin@cluster0.0p3aumk.mongodb.net/"

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

