export interface InquiryFormValues {
  customerName: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface PrototypeInquirySubmission {
  submit(values: InquiryFormValues): Promise<void>;
}
