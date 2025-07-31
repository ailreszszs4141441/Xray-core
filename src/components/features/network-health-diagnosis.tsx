"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { runNetworkHealthDiagnosis } from '@/lib/actions';
import { NetworkHealthDiagnosisInput, NetworkHealthDiagnosisOutput } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export function NetworkHealthDiagnosisCard() {
  const [input, setInput] = useState<NetworkHealthDiagnosisInput>({ jitter: 20, latency: 50, packetLoss: 1 });
  const [output, setOutput] = useState<NetworkHealthDiagnosisOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleRunDiagnosis = async () => {
    setLoading(true);
    setOutput(null);
    const result = await runNetworkHealthDiagnosis(input);
    setOutput(result);
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Health Diagnosis</CardTitle>
        <CardDescription>Analyze your network&apos;s health using our advanced AI.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="latency">Latency (ms)</Label>
            <Input id="latency" name="latency" type="number" value={input.latency} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="jitter">Jitter (ms)</Label>
            <Input id="jitter" name="jitter" type="number" value={input.jitter} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="packetLoss">Packet Loss (%)</Label>
            <Input id="packetLoss" name="packetLoss" type="number" value={input.packetLoss} onChange={handleInputChange} />
          </div>
          <Button onClick={handleRunDiagnosis} disabled={loading}>
            {loading ? 'Analyzing...' : 'Run Diagnosis'}
          </Button>
        </div>
        {loading && (
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )}
        {output && !loading && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <h4 className="font-semibold">Diagnosis Result:</h4>
            <p className="text-sm">{output.diagnosis}</p>
            <h5 className="font-semibold mt-2">Recommendations:</h5>
            <ul className="list-disc list-inside text-sm">
              {output.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
