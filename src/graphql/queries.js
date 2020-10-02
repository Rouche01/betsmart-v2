/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTip = /* GraphQL */ `
  query GetTip($id: ID!) {
    getTip(id: $id) {
      id
      homeTeam
      awayTeam
      league
      odds
      tips
      risk
      createdAt
      updatedAt
    }
  }
`;
export const listTips = /* GraphQL */ `
  query ListTips(
    $filter: ModelTipFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTips(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        homeTeam
        awayTeam
        league
        odds
        tips
        risk
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
