const {ApolloSever} = require('apollo-server');
const typeDefs = require('./schema');

const server = new ApolloServer({ typeDefs });