'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, DollarSign, Percent, Shield } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function WorkingCapitalPage() {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // This would integrate with your capital provider's API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Application submitted successfully');
    } catch (error) {
      toast.error('Failed to submit application');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8">
        <Link 
          href="/dashboard" 
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Working Capital</h1>
            <p className="text-muted-foreground">
              Access flexible financing solutions for your business
            </p>
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">How much do you need?</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  You can request up to $100,000 based on your business history
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                Apply Now
              </Button>
            </form>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-4">
              <div className="flex flex-col items-center text-center space-y-2">
                <Shield className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold">Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Bank-level security for all transactions
                </p>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex flex-col items-center text-center space-y-2">
                <Percent className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold">Competitive Rates</h3>
                <p className="text-sm text-muted-foreground">
                  Industry-leading interest rates
                </p>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex flex-col items-center text-center space-y-2">
                <ArrowRight className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold">Fast Approval</h3>
                <p className="text-sm text-muted-foreground">
                  Get funds within 24-48 hours
                </p>
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Available Credit</h3>
            <div className="text-3xl font-bold mb-2">$50,000</div>
            <p className="text-sm text-muted-foreground mb-4">
              Based on your business performance
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Interest Rate</span>
                <span className="font-medium">4.5% APR</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Term Length</span>
                <span className="font-medium">12 months</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Processing Fee</span>
                <span className="font-medium">1.5%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our team is here to help you understand your financing options
            </p>
            <Button variant="outline" className="w-full">
              Schedule a Call
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
