
import { create } from 'zustand';
import { AINeuralEngine, AINeuralEngineSchema } from '@/ai/flows/ai-neural-engine';
import { HyperPerformanceModule, HyperPerformanceModuleSchema } from '@/ai/flows/hyper-performance-module';
import { InfrastructureFeatures, InfrastructureFeaturesSchema } from '@/ai/flows/infrastructure-features';
import { QuantumSafeSupreme, QuantumSafeSupremeSchema } from '@/ai/flows/quantum-safe-supreme';
import { StealthTechnologyProMax, StealthTechnologyProMaxSchema } from '@/ai/flows/stealth-technology-pro-max';

const mergeConfigs = (states: Partial<AppState>) => {
  const xrayConfig: any = {
    log: {
      loglevel: 'warning',
    },
    inbounds: [
      {
        port: 1080,
        protocol: 'socks',
        settings: {
          auth: 'noauth',
        },
      },
    ],
    outbounds: [
      {
        protocol: 'vless',
        settings: {},
        streamSettings: {},
      },
    ],
    policy: {
      levels: {
        '0': {
          handshake: 4,
          connIdle: 300,
          uplinkOnly: 1,
          downlinkOnly: 1,
        },
      },
    },
    other: {},
  };

  if (states.aiNeuralEngineConfig) {
    xrayConfig.other['ai-neural-engine'] = states.aiNeuralEngineConfig;
  }
  if (states.hyperPerformanceModuleConfig) {
    xrayConfig.other['hyper-performance-module'] = states.hyperPerformanceModuleConfig;
  }
  if (states.infrastructureFeaturesConfig) {
    xrayConfig.other['infrastructure-features'] = states.infrastructureFeaturesConfig;
  }
  if (states.quantumSafeSupremeConfig) {
    xrayConfig.other['quantum-safe-supreme'] = states.quantumSafeSupremeConfig;
  }
  if (states.stealthTechnologyProMaxConfig) {
    xrayConfig.other['stealth-technology-pro-max'] = states.stealthTechnologyProMaxConfig;
  }

  return xrayConfig;
};

interface AppState {
  aiNeuralEngineConfig: AINeuralEngine;
  hyperPerformanceModuleConfig: HyperPerformanceModule;
  infrastructureFeaturesConfig: InfrastructureFeatures;
  quantumSafeSupremeConfig: QuantumSafeSupreme;
  stealthTechnologyProMaxConfig: StealthTechnologyProMax;
  finalConfig: object;

  updateAINeuralEngineConfig: (values: Partial<AINeuralEngine>) => void;
  updateHyperPerformanceModuleConfig: (values: Partial<HyperPerformanceModule>) => void;
  updateInfrastructureFeaturesConfig: (values: Partial<InfrastructureFeatures>) => void;
  updateQuantumSafeSupremeConfig: (values: Partial<QuantumSafeSupreme>) => void;
  updateStealthTechnologyProMaxConfig: (values: Partial<StealthTechnologyProMax>) => void;
}

export const useAppStore = create<AppState>((set) => {
    const initialState = {
        aiNeuralEngineConfig: AINeuralEngineSchema.parse({}),
        hyperPerformanceModuleConfig: HyperPerformanceModuleSchema.parse({}),
        infrastructureFeaturesConfig: InfrastructureFeaturesSchema.parse({}),
        quantumSafeSupremeConfig: QuantumSafeSupremeSchema.parse({}),
        stealthTechnologyProMaxConfig: StealthTechnologyProMaxSchema.parse({}),
    };

    return {
        ...initialState,
        finalConfig: mergeConfigs(initialState),
    
        updateAINeuralEngineConfig: (values) => {
            set((state) => {
              const aiNeuralEngineConfig = { ...state.aiNeuralEngineConfig, ...values };
              const newPartialState = { ...state, aiNeuralEngineConfig };
              return { ...newPartialState, finalConfig: mergeConfigs(newPartialState) };
            });
          },
        updateHyperPerformanceModuleConfig: (values) => {
            set((state) => {
              const hyperPerformanceModuleConfig = { ...state.hyperPerformanceModuleConfig, ...values };
              const newPartialState = { ...state, hyperPerformanceModuleConfig };
              return { ...newPartialState, finalConfig: mergeConfigs(newPartialState) };
            });
          },
        updateInfrastructureFeaturesConfig: (values) => {
            set((state) => {
                const infrastructureFeaturesConfig = { ...state.infrastructureFeaturesConfig, ...values };
                const newPartialState = { ...state, infrastructureFeaturesConfig };
                return { ...newPartialState, finalConfig: mergeConfigs(newPartialState) };
              });
          },
        updateQuantumSafeSupremeConfig: (values) => {
            set((state) => {
                const quantumSafeSupremeConfig = { ...state.quantumSafeSupremeConfig, ...values };
                const newPartialState = { ...state, quantumSafeSupremeConfig };
                return { ...newPartialState, finalConfig: mergeConfigs(newPartialState) };
              });
          },
        updateStealthTechnologyProMaxConfig: (values) => {
            set((state) => {
                const stealthTechnologyProMaxConfig = { ...state.stealthTechnologyProMaxConfig, ...values };
                const newPartialState = { ...state, stealthTechnologyProMaxConfig };
                return { ...newPartialState, finalConfig: mergeConfigs(newPartialState) };
              });
          },
    }
});
