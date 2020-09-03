import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-2_HlU6pAYaT',
  ClientId: '5e59ls9c33oi9jo2i2unmh2gk2'
};

export default new CognitoUserPool(poolData);