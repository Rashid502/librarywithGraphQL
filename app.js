const express = require("express");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");
const connectDb = require("./config/db.js")
const cors = require("cors");

var app = express();
app.use(cors());
connectDb();

app.use('/graphql', graphqlHTTP({
    schema, 
    graphiql:true
}));

app.listen(5000, () => {
    console.log("listening on port 5000")
})