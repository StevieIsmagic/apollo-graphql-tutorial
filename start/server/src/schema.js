const { gql } = require('apollo-server');

const typeDefs = gql`

  # SCHEMAS
  
  #the Launch object type has a collection of fields, and each field has a type of its own
  type Launch {
  id: ID!
  site: String
  cursorLaunchDate: String
  mission: Mission
  rocket: Rocket
  isBooked: Boolean!
  }

  # ! - means this field's value can never be null
  type Rocket {
  id: ID!
  name: String
  type: String
  }

  # if an array has an exclamation point after it, the array cannot be null, but it CAN be empty
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

  # return Type of bookTrips/cancelTrips mutations
  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  # QUERIES - allow client to fetch data

  type Query {
    launches(
      pageSize: Int
      after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
    me: User
  }

  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  # MUTATIONS - allow client to modify data

  # it's good practice for a mutation to return whatever objects it modifies, so the requesting client can update its cache an UI without need to make a followup request
  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String): String # login token
  }
`;

module.exports = typeDefs;