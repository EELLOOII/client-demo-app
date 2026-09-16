export interface QuotationRequestFormValues {
  customerName: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  quantity: string;
  requirements: string;
}

export interface PrototypeQuotationSubmission {
  submit(values: QuotationRequestFormValues): Promise<void>;
}
