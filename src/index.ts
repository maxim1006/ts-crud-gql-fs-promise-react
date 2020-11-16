import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './gql/resolvers/resolvers';
import { typeDefs } from './gql/typeDefs/typeDefs';

const apolloServer = new ApolloServer({
    resolvers,
    typeDefs,
    context: () => {},
});

const app = express();
apolloServer.applyMiddleware({ app });

app.use(express.static('./client/build'));

app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`));
