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

export const QUAL_RESULTS = gql`
query QualResults($season: String!) {
  qualifying(season: $season) {
    season
    round
    raceName
    Circuit {
      circuitName
    }
    QualifyingResults {
      position
      number
      Driver {
        givenName
        familyName
      }
      Constructor {
        name
      }
      Q1
      Q2
      Q3
    }
  }
}
`;