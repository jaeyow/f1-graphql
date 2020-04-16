import gql from 'graphql-tag';  
  
  export const RACES_LIST = gql`
  query RACES_LIST {
    races {
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
  query SEASONS_LIST {
    seasons {
      season
      url
    }
  }
`;