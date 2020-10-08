/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTip = /* GraphQL */ `
  mutation CreateTip(
    $input: CreateTipInput!
    $condition: ModelTipConditionInput
  ) {
    createTip(input: $input, condition: $condition) {
      id
      homeTeam
      awayTeam
      league
      odds
      tips
      risk
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateTip = /* GraphQL */ `
  mutation UpdateTip(
    $input: UpdateTipInput!
    $condition: ModelTipConditionInput
  ) {
    updateTip(input: $input, condition: $condition) {
      id
      homeTeam
      awayTeam
      league
      odds
      tips
      risk
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteTip = /* GraphQL */ `
  mutation DeleteTip(
    $input: DeleteTipInput!
    $condition: ModelTipConditionInput
  ) {
    deleteTip(input: $input, condition: $condition) {
      id
      homeTeam
      awayTeam
      league
      odds
      tips
      risk
      createdAt
      updatedAt
      owner
    }
  }
`;
