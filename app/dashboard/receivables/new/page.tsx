'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useMoniteContext } from '@monite/sdk-react';
import { ArrowLeft, Plus, Trash } from 'lucide-react';
import Link from 'next/link';

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export default function NewReceivablePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const monite = useMoniteContext();

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    dueDate: '',
    notes: '',
    lineItems: [{ description: '', quantity: 1, unitPrice: 0 }] as LineItem[],
  });

  const addLineItem = () => {
    setFormData({
      ...formData,
      lineItems: [...formData.lineItems, { description: '', quantity: 1, unitPrice: 0 }],
    });
  };

  const removeLineItem = (index: number) => {
    setFormData({
      ...formData,
      lineItems: formData.lineItems.filter((_, i) => i !== index),
    });
  };

  const updateLineItem = (index: number, field: keyof LineItem, value: string | number) => {
    const newLineItems = [...formData.lineItems];
    newLineItems[index] = {
      ...newLineItems[index],
      [field]: value,
    };
    setFormData({ ...formData, lineItems: newLineItems });
  };

  const calculateTotal = () => {
    return formData.lineItems.reduce((total, item) => {
      return total + (item.quantity * item.unitPrice);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create receivable using Monite SDK
      const response = await monite.api.receivables.create({
        type: 'invoice',
        currency: 'USD',
        amount: calculateTotal() * 100, // Convert to cents
        due_date: new Date(formData.dueDate).toISOString(),
        line_items: formData.lineItems.map(item => ({
          quantity: item.quantity,
          unit_price: item.unitPrice * 100,
          description: item.description,
        })),
        counterpart_name: formData.clientName,
        counterpart_email: formData.clientEmail,
        memo: formData.notes,
      });

      toast.success('Invoice created successfully');
      router.push('/dashboard/receivables');
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast.error('Failed to create invoice');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <Link 
          href="/dashboard" 
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-6">Create New Invoice</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                placeholder="Enter client name"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientEmail">Client Email</Label>
              <Input
                id="clientEmail"
                type="email"
                placeholder="client@example.com"
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Line Items</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addLineItem}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </div>

            {formData.lineItems.map((item, index) => (
              <div key={index} className="grid grid-cols-[1fr,auto,auto,auto] gap-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Input
                    id={`description-${index}`}
                    value={item.description}
                    onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`quantity-${index}`}>Qty</Label>
                  <Input
                    id={`quantity-${index}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateLineItem(index, 'quantity', Number(e.target.value))}
                    required
                    className="w-24"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`price-${index}`}>Price</Label>
                  <Input
                    id={`price-${index}`}
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateLineItem(index, 'unitPrice', Number(e.target.value))}
                    required
                    className="w-32"
                  />
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLineItem(index)}
                  disabled={formData.lineItems.length === 1}
                  className="mb-2"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <div className="flex justify-end text-lg font-semibold">
              Total: ${calculateTotal().toFixed(2)}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Create Invoice
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
