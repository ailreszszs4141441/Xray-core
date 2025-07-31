"use server"

import { runFlow } from "genkit"
import {
  trafficObfuscation,
} from "@/ai/flows/traffic-obfuscation"
import {
  TrafficObfuscationInput,
  TrafficObfuscationOutput,
  NetworkHealthDiagnosisInput,
  NetworkHealthDiagnosisOutput,
} from "./types"
import { networkHealthDiagnosis } from "@/ai/flows/network-health-diagnosis";

/**
 * Runs the traffic obfuscation flow.
 * @param input The input for the traffic obfuscation flow.
 * @returns The output of the traffic obfuscation flow.
 */
export async function runTrafficObfuscation(
  input: TrafficObfuscationInput
): Promise<TrafficObfuscationOutput> {
  return await runFlow(trafficObfuscation, input)
}


export async function runNetworkHealthDiagnosis(
  input: NetworkHealthDiagnosisInput
): Promise<NetworkHealthDiagnosisOutput> {
  return await runFlow(networkHealthDiagnosis, input);
}
