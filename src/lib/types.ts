export interface TrafficObfuscationInput {
  packetSize: number;
  timing: number;
  protocol: string;
}

export interface TrafficObfuscationOutput {
  status: string;
  obfuscatedPacket: string;
}

export interface NetworkHealthDiagnosisInput {
  jitter: number;
  latency: number;
  packetLoss: number;
}

export interface NetworkHealthDiagnosisOutput {
  diagnosis: string;
  recommendations: string[];
}
