"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { runNetworkHealthDiagnosis } from '@/lib/actions';
import { NetworkHealthDiagnosisOutput } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  jitter: z.coerce.number().min(0, "Jitter must be a positive number."),
  latency: z.coerce.number().min(0, "Latency must be a positive number."),
  packetLoss: z.coerce.number().min(0, "Packet loss must be a positive number.").max(100, "Packet loss cannot exceed 100%.")
});

export function NetworkHealthDiagnosis() {
  const [result, setResult] = useState<NetworkHealthDiagnosisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jitter: 0,
      latency: 0,
      packetLoss: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const output = await runNetworkHealthDiagnosis(values);
    setResult(output);
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Health Diagnosis</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="jitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jitter (ms)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="latency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latency (ms)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="packetLoss"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Packet Loss (%)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Diagnosing...' : 'Diagnose Network Health'}
            </Button>
          </form>
        </Form>
        {isLoading && (
            <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-5/6" />
            </div>
        )}
        {result && (
          <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
            <h3 className="font-bold">Diagnosis Result:</h3>
            <p>{result.diagnosis}</p>
            <h4 className="font-bold mt-2">Recommendations:</h4>
            <ul className="list-disc list-inside">
              {result.recommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
