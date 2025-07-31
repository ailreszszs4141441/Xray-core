import {
  trafficObfuscation,
} from '@/ai/flows/traffic-obfuscation';

import { runFlow } from 'genkit/flow';
import {
  TrafficObfuscationInput,
  TrafficObfuscationOutput,
  NetworkHealthDiagnosisInput,
  NetworkHealthDiagnosisOutput,
} from './types';
import { networkHealthDiagnosis } from '@/ai/flows/network-health-diagnosis';

/**
 * Runs the trafficObfuscation flow.
 * @param input The input for the traffic obfuscation flow.
 * @returns The output of the traffic obfuscation flow.
 */
export async function runTrafficObfuscation(input: TrafficObfuscationInput): Promise<TrafficObfuscationOutput> {
  return await trafficObfuscation(input);
}

export async function runNetworkHealthDiagnosis(input: NetworkHealthDiagnosisInput): Promise<NetworkHealthDiagnosisOutput> {
    return await runFlow(networkHealthDiagnosis, input);
}
