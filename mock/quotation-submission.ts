import type { PrototypeQuotationSubmission, QuotationRequestFormValues } from "@/types/quotation";

const SUBMISSION_DELAY_MS = 350;

export const prototypeQuotationSubmission: PrototypeQuotationSubmission = {
  async submit(values: QuotationRequestFormValues): Promise<void> {
    void values;
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, SUBMISSION_DELAY_MS);
    });
  },
};
