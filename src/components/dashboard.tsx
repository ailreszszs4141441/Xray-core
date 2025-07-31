"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ConfigGenerator } from "./features/config-generator";
import { SmartRouting } from "./features/smart-routing";
import { QuantumRelay } from "./features/quantum-relay";
import { StealthMode } from "./features/stealth-mode";
import { AINeuralEngine } from "./features/ai-neural-engine";
import { TrafficObfuscation } from "./features/traffic-obfuscation";
import { HyperPerformanceModule } from "./features/hyper-performance-module";
import { QuantumSafeSupreme } from "./features/quantum-safe-supreme";
import { StealthTechnologyProMax } from "./features/stealth-technology-pro-max";
import { InfrastructureFeatures } from "./features/infrastructure-features";
import { NetworkHealthDiagnosis } from "./features/network-health-diagnosis"; // Import the new component

export function Dashboard() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        QuantumProxy-AI Dashboard
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={activeItem ?? ""}
        onValueChange={setActiveItem}
      >
        <AccordionItem value="config-generator">
          <AccordionTrigger>Config Generator</AccordionTrigger>
          <AccordionContent>
            <ConfigGenerator />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="smart-routing">
          <AccordionTrigger>Smart Routing</AccordionTrigger>
          <AccordionContent>
            <SmartRouting />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="quantum-relay">
          <AccordionTrigger>Quantum Relay</AccordionTrigger>
          <AccordionContent>
            <QuantumRelay />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="stealth-mode">
          <AccordionTrigger>Stealth Mode</AccordionTrigger>
          <AccordionContent>
            <StealthMode />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="ai-neural-engine">
          <AccordionTrigger>AI Neural Engine</AccordionTrigger>
          <AccordionContent>
            <AINeuralEngine />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="traffic-obfuscation">
          <AccordionTrigger>Traffic Obfuscation</AccordionTrigger>
          <AccordionContent>
            <TrafficObfuscation />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="hyper-performance">
          <AccordionTrigger>Hyper-Performance Module</AccordionTrigger>
          <AccordionContent>
            <HyperPerformanceModule />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="quantum-safe">
          <AccordionTrigger>Quantum-Safe Supreme</AccordionTrigger>
          <AccordionContent>
            <QuantumSafeSupreme />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="stealth-pro-max">
          <AccordionTrigger>Stealth Technology Pro Max</AccordionTrigger>
          <AccordionContent>
            <StealthTechnologyProMax />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="infrastructure-features">
          <AccordionTrigger>Infrastructure Features</AccordionTrigger>
          <AccordionContent>
            <InfrastructureFeatures />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="network-health-diagnosis">
          <AccordionTrigger>Network Health Diagnosis</AccordionTrigger>
          <AccordionContent>
            <NetworkHealthDiagnosis />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
