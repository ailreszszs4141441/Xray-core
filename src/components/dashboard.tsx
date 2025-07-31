"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ConfigGenerator } from "@/components/features/config-generator"
import { AINeuralEngine } from "@/components/features/ai-neural-engine"
import { HyperPerformance } from "@/components/features/hyper-performance-module"
import { InfrastructureFeatures } from "@/components/features/infrastructure-features"
import { QuantumSafeSupreme } from "./features/quantum-safe-supreme"
import { StealthTechnologyProMax } from "./features/stealth-technology-pro-max"
import { TrafficObfuscation } from "./features/traffic-obfuscation"
import { NetworkHealthDiagnosisCard } from "./features/network-health-diagnosis"

export function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Welcome to QuantumProxy AI-X</CardTitle>
          <CardDescription>
            Your all-in-one solution for a secure, private, and unrestricted
            internet experience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Explore the features below to customize your connection. Each card
            represents a powerful module in our suite.
          </p>
        </CardContent>
      </Card>
      <ConfigGenerator />
      <AINeuralEngine />
      <HyperPerformance />
      <InfrastructureFeatures />
      <QuantumSafeSupreme />
      <StealthTechnologyProMax />
      <TrafficObfuscation />
      <NetworkHealthDiagnosisCard />
    </div>
  )
}
