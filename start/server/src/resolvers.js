module.exports = {
  Query: {
    launches: (_, __, { dataSources }) =>
      dataSources.launchAPI.getAllLaunches(),
    launch: (_, { id }, { dataSources }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
  }
};


/*
RESOLVER FUNCTION SIGNATURE

fieldName: (parent, args, context, info) => data;

  parent - return value of the resolver for this field's parent

  args - object that contains all the GraphQL arguments provided for this field

  context - object that is shared across all resolvers that execute for a particular operation. Use this to share per-operation-state, such as authentication information and access to data sources.
  
  info - contains information about execution state of operation - used only in advanced state

*/ 