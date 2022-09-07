const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const express = require('express');
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

async function startApolloServer() {
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
        },
        plugins: [
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
        csrfPrevention: true,
        cahce: 'bounded',
    });

    await server.start();

    const app = express();

    // app.use(express.static(path.join('../../client', 'build')));
    // app.get('/*', function (req, res) {
    //     res.sendFile(path.join('../../client', 'build', 'index.html'))
    // });
    
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

    console.log('Server ready at', `http$://localhost:4000/graphql`);

    return {server, app};
}

startApolloServer();
