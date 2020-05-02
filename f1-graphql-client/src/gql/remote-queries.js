import gql from 'graphql-tag';  
  
  export const RACE_RESULTS = gql`
  query RaceResults($season: String!, $limit: String!) {
    results(season: $season, limit: $limit) {
      season
      round
      url
      raceName
      date
      time
      Circuit {
        circuitId
        url
        circuitName
        Location {
          locality
          country
        }
      }
      Results {
        number
        position
        positionText
        points
        grid
        laps
        status
        Driver {
          driverId
          permanentNumber
          code
          url
          givenName
          familyName
          dateOfBirth
          nationality
        }
        Constructor {
          constructorId
          url
          name
          nationality
        }
        Time {
          millis
          time
        }
        FastestLap {
          rank
          lap
          Time {
            millis
            time
          }
          AverageSpeed {
            units
            speed
          }
        }
      }
    }
  }
`;

export const SEASONS_LIST = gql`
  query SeasonsList {
    seasons {
      season
      url
    }
  }
`;

export const SEASON_RACES = gql`
  query SeasonRaces($season: String!) {
    races(season: $season) {
      raceName
      date
      season
      round
      url
      Circuit {
        circuitId
        url
        circuitName
        Location {
          locality
          country
          long
          lat
        }
      }
    }
  }
`;

export const MAIN_RESULTS = gql`
query MainResults($season: String!) {
  raceResults(season: $season) {
    raceName 
    round
    date
    results {
      position
      Driver {
        givenName
        familyName
      }
      Constructor {
        name
      }
      laps
      Time {
        time
      }
    }
  }
}
`;

export const MAIN_RESULTS_V2 = gql`
query MainResults($season: String!) {
  raceResultsV2(season: $season, resultsLimit: 30) {
    raceName 
    round
    date
    Circuit {
      circuitName
      Location {
        locality
        country
      }
    }
    Results {
      position
      number
      points
      Driver {
        givenName
        familyName
      }
      Constructor {
        name
      }
      laps
      Time {
        time
      }
    }
  }
}
`;