const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect("mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PASSWORD+"@freitas.itumg.mongodb.net/"+process.env.MONGO_DB, 
  {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(err => {
    console.log(err);
  });
