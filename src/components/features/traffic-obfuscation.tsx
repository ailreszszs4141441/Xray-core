"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { runTrafficObfuscation } from '@/lib/actions';
import { TrafficObfuscationInput, TrafficObfuscationOutput } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';

export function TrafficObfuscation() {
  const [input, setInput] = useState<TrafficObfuscationInput>({ packetSize: 1500, timing: 100, protocol: 'TCP' });
  const [output, setOutput] = useState<TrafficObfuscationOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: name === 'protocol' ? value : Number(value) }));
  };

  const handleRunObfuscation = async () => {
    setLoading(true);
    setOutput(null);
    try {
      const result = await runTrafficObfuscation(input);
      setOutput(result);
      toast({
        title: "Obfuscation Successful",
        description: "Traffic analysis complete.",
      });
    } catch (error) {
      console.error("Error running traffic obfuscation:", error);
      toast({
        title: "Obfuscation Failed",
        description: "Could not analyze traffic. See console for details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Powered Traffic Obfuscation</CardTitle>
        <CardDescription>Use AI to analyze and recommend the best obfuscation techniques.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="packetSize">Packet Size (bytes)</Label>
            <Input id="packetSize" name="packetSize" type="number" value={input.packetSize} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="timing">Timing (ms)</Label>
            <Input id="timing" name="timing" type="number" value={input.timing} onChange={handleInputChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="protocol">Protocol</Label>
            <Input id="protocol" name="protocol" type="text" value={input.protocol} onChange={handleInputChange} />
          </div>
          <Button onClick={handleRunObfuscation} disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze Traffic'}
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
            <h4 className="font-semibold">Obfuscation Result:</h4>
            <p className="text-sm">Status: {output.status}</p>
            <p className="text-sm font-mono break-all">Obfuscated Packet: {output.obfuscatedPacket}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
