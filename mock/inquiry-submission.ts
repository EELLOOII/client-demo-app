import type { InquiryFormValues, PrototypeInquirySubmission } from "@/types/inquiry";

const SUBMISSION_DELAY_MS = 350;

export const prototypeInquirySubmission: PrototypeInquirySubmission = {
  async submit(values: InquiryFormValues): Promise<void> {
    void values;
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, SUBMISSION_DELAY_MS);
    });
  },
};
