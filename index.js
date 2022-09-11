const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const express = require('express');
const Query = require('./src/resolvers/Query');
const Mutation = require('./src/resolvers/Mutation');
const User = require('./src/resolvers/User');
const Link = require('./src/resolvers/Link');
const Vote = require('./src/resolvers/Vote');
const Quiz = require('./src/resolvers/Quiz');
const Question = require('./src/resolvers/Question');
const Choice = require('./src/resolvers/Choice');
const Result = require('./src/resolvers/Result');
const Taken = require('./src/resolvers/Taken');
const Others = require('./src/resolvers/Others');

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

    const { getUserId } = require('./src/utils');
    const server = new ApolloServer({
        typeDefs: fs.readFileSync(
            path.join(__dirname, 'src','schema.graphql'),
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

    // app.use(express.static(path.join(__dirname, "..", 'public')));
    // app.get('/*', function (req, res) {
    //     res.sendFile(path.join('../../client', 'build', 'index.html'))
    // });

    const port = process.env.PORT || 4000;

    // const publicPath = path.join(__dirname, '..', "public");
    // console.log(publicPath);

    // app.use(express.static(publicPath));

    // app.get('*', (req, res) => {
    //     res.sendFile(path.join(publicPath, 'index.html'));
    // });

    server.applyMiddleware({ app });

    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
        app.use(express.static('client/build'));
        app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
        });
    }
    
    // app.use(express.static(path.join(__dirname, "../client/build")));

    // app.get('*', (req, res) => {
    //     res.sendFile(path.join(__dirname + '/../client/build/index.html'))
    // })

    app.listen(port, () =>
        console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
    );

    return {server, app};
}

startApolloServer();
