export class MoniteService {
  private baseUrl: string;
  private token: string;
  private entityId: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_MONITE_API_URL!;
    this.token = process.env.NEXT_PUBLIC_MONITE_TOKEN!;
    this.entityId = process.env.NEXT_PUBLIC_MONITE_ENTITY_ID!;
  }

  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        'x-monite-version': process.env.NEXT_PUBLIC_MONITE_VERSION!,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Monite API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getInvoices(params: { limit?: number; offset?: number } = {}) {
    return this.fetch(`/invoices`, {
      method: 'GET',
      headers: {
        'x-monite-entity-id': this.entityId,
      },
    });
  }

  async createInvoice(data: any) {
    return this.fetch(`/invoices`, {
      method: 'POST',
      headers: {
        'x-monite-entity-id': this.entityId,
      },
      body: JSON.stringify(data),
    });
  }

  async getInvoice(id: string) {
    return this.fetch(`/invoices/${id}`, {
      method: 'GET',
      headers: {
        'x-monite-entity-id': this.entityId,
      },
    });
  }

  async updateInvoice(id: string, data: any) {
    return this.fetch(`/invoices/${id}`, {
      method: 'PATCH',
      headers: {
        'x-monite-entity-id': this.entityId,
      },
      body: JSON.stringify(data),
    });
  }
}
