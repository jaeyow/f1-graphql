const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: () => ({
    lat: { type: GraphQLString },
    long: { type: GraphQLString },
    locality: { type: GraphQLString },
    country: { type: GraphQLString }
  })
});

const CircuitType = new GraphQLObjectType({
  name: 'Circuit',
  fields: () => ({
    circuitId: { type: GraphQLString },
    url: { type: GraphQLString },
    circuitName: { type: GraphQLString },
    Location: { type: LocationType }
  })
});

const RaceType = new GraphQLObjectType({
  name: 'Race',
  fields: () => ({
    season: { type: GraphQLString },
    round: { type: GraphQLString },
    url:  { type: GraphQLString },
    raceName: { type: GraphQLString },
    Circuit: { type: CircuitType },
    date: { type: GraphQLString },
    time: { type: GraphQLString },
    Results: { type: new GraphQLList(ResultType)}
  })
});

const DriverType = new GraphQLObjectType({
  name: 'Driver',
  fields: () => ({
    driverId: { type: GraphQLString },
    permanentNumber: { type: GraphQLString },
    code: { type: GraphQLString },
    url: { type: GraphQLString },
    givenName: { type: GraphQLString },
    familyName: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    nationality: { type: GraphQLString }
  })
});

const ConstructorType = new GraphQLObjectType({
  name: 'Constructor',
  fields: () => ({
    constructorId: { type: GraphQLString },
    url: { type: GraphQLString },
    name: { type: GraphQLString },
    nationality: { type: GraphQLString }
  })
});

const TimeType = new GraphQLObjectType({
  name: 'Time',
  fields: () => ({
    millis: { type: GraphQLString },
    time: { type: GraphQLString }
  })
});

const AverageSpeedType = new GraphQLObjectType({
  name: 'AverageSpeed',
  fields: () => ({
    units: { type: GraphQLString },
    speed: { type: GraphQLString }
  })
});

const FastestLapType = new GraphQLObjectType({
  name: 'FastestLap',
  fields: () => ({
    rank: { type: GraphQLString },
    lap: { type: GraphQLString },
    Time: { type: TimeType },
    AverageSpeed: { type: AverageSpeedType }
  })
});

const ResultType = new GraphQLObjectType({
  name: 'Result',
  fields: () => ({
    number: { type: GraphQLString },
    position: { type: GraphQLString },
    positionText: { type: GraphQLString },
    points: { type: GraphQLString },
    Driver: { type: DriverType },
    Constructor: { type: ConstructorType },
    grid: { type: GraphQLString },
    laps: { type: GraphQLString },
    status: { type: GraphQLString },
    Time: { type: TimeType },
    FastestLap: { type: FastestLapType }
  })
});

// Root Query
const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    races: {
      type: new GraphQLList(RaceType),
      resolve(parent, args) {
        return axios
          .get('http://localhost:3000/MRData') // the json-server mock data
          .then(res => res.data.RaceTable.Races);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQueryType
});