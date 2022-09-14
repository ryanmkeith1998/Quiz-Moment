const { ApolloServer } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');
const { ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core');
const express = require('express');
const Query = require('./src/resolvers/Query');
const Mutation = require('./src/resolvers/Mutation');
const User = require('./src/resolvers/User');
const Quiz = require('./src/resolvers/Quiz');
const Question = require('./src/resolvers/Question');
const Choice = require('./src/resolvers/Choice');
const Result = require('./src/resolvers/Result');
const Taken = require('./src/resolvers/Taken');
const Others = require('./src/resolvers/Others');
const http = require('http');

async function startApolloServer() {
    const resolvers = {
        Query,
        Mutation,
        User,
        Quiz,
        Question,
        Choice,
        Result,
        Taken,
        Others,
    }

    const fs = require('fs');

    const path = require('path');

    const prisma = new PrismaClient();

    const { getUserId } = require('./src/utils');

    const app = express();
    const httpServer = http.createServer(app);

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

    const port = process.env.PORT || 4000;    

    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
        app.use(express.static('client/build'));
        app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
        });
    }
    
    server.applyMiddleware({ app });

    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    
    
    return { server, app };
}
startApolloServer();
