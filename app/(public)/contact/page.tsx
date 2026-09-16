import type { Metadata } from "next";
import { Building2, Mail, MapPinned, Phone } from "lucide-react";
import { InquiryForm } from "@/components/public/inquiry-form";
import { PublicContainer } from "@/components/public/public-container";
import { SectionHeading } from "@/components/public/section-heading";

export const metadata: Metadata = {
  title: "Contact | KQ Emporium",
  description:
    "Use the KQ Emporium inquiry prototype to share your industrial supply question. No information is sent or saved in this frontend prototype.",
};

const CONTACT_PLACEHOLDERS = [
  {
    icon: Building2,
    label: "Business address",
    value: "Client-provided address pending",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "Client-provided phone number pending",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Client-provided email address pending",
  },
];

export default function ContactPage() {
  return (
    <PublicContainer className="py-16 sm:py-20">
      <SectionHeading
        description="Tell us about your industrial supply requirements. This frontend prototype does not send or save inquiry information."
        eyebrow="Contact"
        headingLevel={1}
        title="Contact Client's Business Team"
      />
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
        <div className="space-y-6">
          <section
            aria-labelledby="contact-information-title"
            className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-2xl font-bold" id="contact-information-title">
              Company information
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Final contact details will be supplied by KQ Emporium.
            </p>
            <dl className="mt-6 space-y-5">
              {CONTACT_PLACEHOLDERS.map(({ icon: Icon, label, value }) => (
                <div className="flex gap-3" key={label}>
                  <Icon
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-primary"
                  />
                  <div>
                    <dt className="text-sm font-semibold">{label}</dt>
                    <dd className="mt-1 text-sm text-muted-foreground">
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </section>
          <section
            aria-labelledby="map-placeholder-title"
            className="overflow-hidden rounded-2xl border bg-muted p-6 shadow-sm sm:p-8"
          >
            <MapPinned aria-hidden="true" className="size-8 text-primary" />
            <h2 className="mt-5 text-2xl font-bold" id="map-placeholder-title">
              Location map pending
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              A final location map will appear here after the client provides
              its business address. No map or external location service is
              loaded in this prototype.
            </p>
          </section>
        </div>
        <InquiryForm />
      </div>
    </PublicContainer>
  );
}
