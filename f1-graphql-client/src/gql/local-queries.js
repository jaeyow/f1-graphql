import gql from 'graphql-tag';  

export const SEASONS_LIST = gql`
  query SEASONS_LIST {
    seasons {
      season
      url
    }
  }
`;