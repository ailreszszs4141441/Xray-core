import { genkit } from 'genkit';
import { googleAI } from 'genkitx/googleai';
import { networkHealthDiagnosis } from './flows/network-health-diagnosis';
import { trafficObfuscation } from './flows/traffic-obfuscation';

export default genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  flows: [
    trafficObfuscation,
    networkHealthDiagnosis,
  ],
  logLevel: 'debug',
  enableTracing: true,
});
