const { gql } = require('apollo-server');

const typeDefs = gql`
  #SCHEMA
  type Launch {
  id: ID!
  site: String
  mission: Mission
  rocket: Rocket
  isBooked: Boolean!

  type Rocket {
  id: ID!
  name: String
  type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }

  # QUERIES

  type Query {
    launches: [Launch]!
    launch(id: ID!): Launch
    me: User
  }
}
`;

module.exports = typeDefs;