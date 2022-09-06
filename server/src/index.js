const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Vote = require('./resolvers/Vote');
const Quiz = require('./resolvers/Quiz');
const Question = require('./resolvers/Question');
const Choice = require('./resolvers/Choice');
const Result = require('./resolvers/Result');
const Taken = require('./resolvers/Taken');
const Others = require('./resolvers/Others');


const resolvers = {
    Query,
    Mutation,
    User,
    Link,
    Quiz,
    Question,
    Choice,
    Vote,
    Result,
    Taken,
    Others,
}


const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const { getUserId } = require('./utils');

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
            prisma,
            userId:
            req && req.headers.authorization
                ? getUserId(req)
                : null
        };
    }
});

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );