const mongoose = require("mongoose");

/* We use an "async" function because connecting a database
takes time, and we don't want to freeze the rest of the app
*/

const connectDB = async () => {
  try {
    //process.env.MONGO_URI will come from our secret .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    /*
        if the database fails, we want to shutdown the whole app
        immediately so we can fix it. 
        (1) means "exit with failure"
        */
    process.exit(1);
  }
};

// export the connection
module.exports = connectDB;
