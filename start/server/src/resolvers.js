module.exports = {
  Query: {
    launches: (_, __, { dataSources }) =>
      dataSources.launchAPI.getAllLaunches(),
    launch: (_, { id }, { dataSources }) =>
      dataSources.launchAPI.getLaunchById({ launchId: id }),
    me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
  },

  Mission: {
    // The default size is 'LARGE' if not provided
    missionPatch: (mission, { size } = { size: 'LARGE' }) => {
      return size === 'SMALL' 
        ? mission.missionPatchSmall
        : mission.missionPatchLarge;
    },
  },
  // isBooked is a resolver for the isBooked field on the Launch type (schema.js)
  Launch: {
    isBooked: async (launch, _, { dataSources}) => dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
  },
  User: {
    trips: async (_, __, { dataSources }) => {
      // get ids of launches by user
      const launchIds = await dataSources.userAPI.getLaunchIdsByUser();
      if (!launchIds.length) return [];
      // look up those launches by their ids
      return (
        dataSources.launchAPI.getLaunchesByIds({ launchIds }) || []
      );
    },
  },


};


/*
RESOLVER FUNCTION SIGNATURE

fieldName: (parent, args, context, info) => data;

  parent - return value of the resolver for this field's parent

  args - object that contains all the GraphQL arguments provided for this field

  context - object that is shared across all resolvers that execute for a particular operation. Use this to share per-operation-state, such as authentication information and access to data sources.
  
  info - contains information about execution state of operation - used only in advanced state

*/ 