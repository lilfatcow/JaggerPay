'use client';

import { EntityDetails, EntityBankAccounts } from '@monite/sdk-react';
import { PageHeader } from '@/components/layout/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function OrganizationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization"
        description="Manage your organization details and bank accounts"
      />
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Organization Details</TabsTrigger>
          <TabsTrigger value="bank-accounts">Bank Accounts</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="rounded-lg border bg-card mt-4">
          <EntityDetails />
        </TabsContent>
        <TabsContent value="bank-accounts" className="rounded-lg border bg-card mt-4">
          <EntityBankAccounts />
        </TabsContent>
      </Tabs>
    </div>
  );
}