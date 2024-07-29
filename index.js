const app = require("./app");
const connectDb = require("./db");

require("dotenv").config();

const port = process.env.PORT || 8080;

app.listen(port,async ()=>{
    console.log(`Server run successfully at http://localhost:${port}`);
    await connectDb();
});
