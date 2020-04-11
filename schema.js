const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const RaceType = new GraphQLObjectType({
  name: 'Race',
  fields: () => ({
    season: {
      type: GraphQLString
    },
    raceName: {
      type: GraphQLString
    },
    circuitName: {
      type: GraphQLString
    },
    results: {
      type: GraphQLList(ResultType)
    }
  })
});

const ResultType = new GraphQLObjectType({
  name: 'Result',
  fields: () => ({
    position: {
      type: GraphQLString
    },
    driverName: {
      type: GraphQLString
    },
    constructorName: {
      type: GraphQLString
    }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    races: {
      type: new GraphQLList(RaceType),
      resolve(parent, args) {
        return axios
          .get('http://localhost:3000/MRData') // the json-server mock data
          .then(res => {
            return res.data.RaceTable.Races.map((race) => {
              return ({
                season: race.season,
                raceName: race.raceName,
                circuitName: race.Circuit.circuitName,
                results: race.Results.map((result) => {
                  return ({
                    position: result.position,
                    driverName: `${result.Driver.givenName} ${result.Driver.familyName}`,
                    constructorName: result.Constructor.name
                  });
                })
              });
            });
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});