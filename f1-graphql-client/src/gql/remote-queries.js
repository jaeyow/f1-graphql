import gql from 'graphql-tag';  

export const SEASONS_LIST = gql`
  query SeasonsList {
    seasons {
      season
      url
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
  raceResults(season: $season, resultsLimit: 30) {
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
      laps
      status
      Time {
        time
      }
    }
  }
}
`;