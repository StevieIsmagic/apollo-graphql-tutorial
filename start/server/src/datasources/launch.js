const { RESTDataSource } = require('apollo-datasource-rest');
const { getArgumentValues } = require('graphql/execution/values');
const moment = require('moment');


/*
The RESTDataSource class automatically caches responses from REST resources with no additional setup. We call this feature partial query caching. It enables you to take advantage of the caching logic that the REST API already exposes.

Note - we moved from Class components b/c SOLID Principles
composition vs configurtion
hi(there(everyone)) vs ...lots of overhead(this..that=this)
*/
class LaunchAPI extends RESTDataSource {
  // what does this do again ?
  // need look deeper into these
      constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }

  /*
  Reducer - transforms returned launch data into the shape that our schema expects. This approach decouples the structure of your schema from the structure of the various data sources that populate its fields.

  Note - see MapReduce (export - transport - load)
  */

  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursorLaunchDate: moment.unix(`${launch.launch_date_unix}`).format("HH:mm YYYY-MM-DD"),
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
    };
  }

  
  async getAllLaunches() {
    const response = await this.get('launches');
    return Array.isArray(response) ? response.map(launch => this.launchReducer(launch)) : [];
  }
  
  async getLaunchById({ launchId }) {
    const response = await this.get('launches', { flight_number: launchId });
    return this.launchReducer(response[0]);
  }
  
  getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId })),
      );
    }
    
  }





module.exports = LaunchAPI;