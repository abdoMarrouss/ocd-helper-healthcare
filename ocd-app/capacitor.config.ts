import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.walliupp.healthcare.ocdhelper',
  appName: 'OCD Helper',
  webDir: 'www',
  android: {
    minSdkVersion: 24,
    targetSdkVersion: 34,
  },
  server: {
    // Remove this before production — dev only
    // androidScheme: 'http',
  },
};

export default config;
