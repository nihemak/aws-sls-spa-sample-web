#!/bin/sh

cat << EOS > ./src/environments/environment.ts
export const environment = {
  production: false,
  apiBaseUrl: '${API_BASE_URL}'
};
EOS

cat << EOS > ./src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiBaseUrl: '${API_BASE_URL}'
};
EOS
