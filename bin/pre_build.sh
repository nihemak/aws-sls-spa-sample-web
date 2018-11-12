#!/bin/sh

cat << EOS > ./src/environments/environment.ts
export const environment = {
  production: false,
  amplify: {
    Auth: {
      region: 'ap-northeast-1',
      userPoolId: '${USER_POOL_ID}',
      userPoolWebClientId: '${USER_POOL_CLIENT_ID}'
    }
  },
  apiBaseUrl: '${API_BASE_URL}',
  localstorageBaseKey: 'CognitoIdentityServiceProvider.${USER_POOL_CLIENT_ID}.'
};
EOS

cat << EOS > ./src/environments/environment.prod.ts
export const environment = {
  production: true,
  amplify: {
    Auth: {
      region: 'ap-northeast-1',
      userPoolId: '${USER_POOL_ID}',
      userPoolWebClientId: '${USER_POOL_CLIENT_ID}'
    }
  },
  apiBaseUrl: '${API_BASE_URL}',
  localstorageBaseKey: 'CognitoIdentityServiceProvider.${USER_POOL_CLIENT_ID}.'
};
EOS
