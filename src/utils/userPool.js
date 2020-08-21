import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-2_fmgsuJCVd',
  ClientId: '3b04dkt6bk7cl4fjl1iaftjmae'
};

export default new CognitoUserPool(poolData);