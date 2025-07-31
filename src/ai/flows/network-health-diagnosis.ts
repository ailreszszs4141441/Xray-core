import { defineFlow, runFlow } from 'genkit';
import * as z from 'zod';
import { NetworkHealthDiagnosisInput, NetworkHealthDiagnosisOutput } from '../../lib/types';

// Define the input schema for the network health diagnosis flow
const networkHealthDiagnosisInputSchema = z.object({
  jitter: z.number().describe('Jitter in ms'),
  latency: z.number().describe('Latency in ms'),
  packetLoss: z.number().describe('Packet loss percentage'),
});

// Define the output schema for the network health diagnosis flow
const networkHealthDiagnosisOutputSchema = z.object({
  diagnosis: z.string().describe('A detailed diagnosis of the network health'),
  recommendations: z.array(z.string()).describe('A list of recommendations to improve network health'),
});

// Define the network health diagnosis flow
export const networkHealthDiagnosis = defineFlow(
  {
    name: 'networkHealthDiagnosis',
    inputSchema: networkHealthDiagnosisInputSchema,
    outputSchema: networkHealthDiagnosisOutputSchema,
  },
  async (input) => {
    const { jitter, latency, packetLoss } = input;

    // A simple logic for diagnosis and recommendations
    // In a real-world scenario, you might use a more complex model or logic
    let diagnosis = 'Network health is optimal.';
    const recommendations: string[] = [];

    if (latency > 100) {
      diagnosis = 'High latency detected, which can cause delays in real-time communication.';
      recommendations.push('Consider moving closer to your Wi-Fi router.');
      recommendations.push('Use a wired connection for better stability.');
    }

    if (jitter > 30) {
      diagnosis = 'High jitter detected, which can result in distorted audio or video.';
      recommendations.push('Reduce network congestion by closing unnecessary applications.');
    }

    if (packetLoss > 2) {
      diagnosis = 'Significant packet loss detected, leading to loss of data.';
      recommendations.push('Restart your router or contact your ISP if the problem persists.');
    }

    if (latency <= 100 && jitter <= 30 && packetLoss <= 2) {
        recommendations.push('No immediate action required. Your network is performing well.');
    }

    return {
      diagnosis,
      recommendations,
    };
  }
);

export async function runNetworkHealthDiagnosis(input: NetworkHealthDiagnosisInput): Promise<NetworkHealthDiagnosisOutput> {
  return await runFlow(networkHealthDiagnosis, input);
}
