"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { prototypeInquirySubmission } from "@/mock/inquiry-submission";
import type { InquiryFormValues } from "@/types/inquiry";

const NAME_MAX_LENGTH = 120;
const COMPANY_MAX_LENGTH = 120;
const EMAIL_MAX_LENGTH = 254;
const PHONE_MAX_LENGTH = 32;
const SUBJECT_MIN_LENGTH = 3;
const SUBJECT_MAX_LENGTH = 120;
const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 2_000;
const PHONE_PATTERN = /^[+()\d][+()\d\s.-]*$/;

const DEFAULT_VALUES: InquiryFormValues = { customerName: "", company: "", email: "", phone: "", subject: "", message: "" };

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p className="mt-2 text-sm font-medium text-danger" id={id}>{message}</p> : null;
}

function requiredText(label: string, minimum?: number) {
  return { validate: (value: string) => {
    const normalized = value.trim();
    if (!normalized) return `${label} is required.`;
    return !minimum || normalized.length >= minimum || `${label} must be at least ${minimum} characters.`;
  } };
}

export function InquiryForm() {
  const [submissionError, setSubmissionError] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { formState: { errors, isSubmitting }, handleSubmit, register, reset } = useForm<InquiryFormValues>({ defaultValues: DEFAULT_VALUES, shouldFocusError: true });
  const onSubmit: SubmitHandler<InquiryFormValues> = async (values) => {
    if (isSubmitting) return;
    setSubmissionError(false);
    try {
      await prototypeInquirySubmission.submit({ customerName: values.customerName.trim(), company: values.company.trim(), email: values.email.trim(), phone: values.phone.trim(), subject: values.subject.trim(), message: values.message.trim() });
      setIsComplete(true);
    } catch {
      setSubmissionError(true);
    }
  };
  if (isComplete) return <section aria-labelledby="inquiry-complete-title" className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-success">Inquiry prototype</p><h2 className="mt-3 text-2xl font-bold" id="inquiry-complete-title">Prototype complete</h2><p aria-live="polite" className="mt-3 text-muted-foreground">Prototype complete. No inquiry was sent or saved.</p><Button className="mt-6" onClick={() => { reset(DEFAULT_VALUES); setSubmissionError(false); setIsComplete(false); }}>Send another prototype inquiry</Button></section>;
  const describedBy = (errorId: string, hasError: boolean) => hasError ? errorId : undefined;
  return <form aria-labelledby="inquiry-form-title" className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8" noValidate onSubmit={handleSubmit(onSubmit)}>
    <div><h2 className="text-2xl font-bold" id="inquiry-form-title">Send an inquiry</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Fields marked <span aria-hidden="true">*</span><span className="sr-only">required</span> are required. This form is a frontend prototype only.</p></div>
    {submissionError ? <div aria-live="assertive" className="mt-6 rounded-xl border border-danger/30 bg-red-50 p-4 text-sm text-danger" role="alert">We could not complete the prototype submission. Your information is still here—please try again.</div> : null}
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      <label className="block text-sm font-semibold" htmlFor="customerName">Full name <span className="text-danger" aria-hidden="true">*</span><input aria-describedby={describedBy("customerName-error", Boolean(errors.customerName))} aria-invalid={Boolean(errors.customerName)} aria-required="true" autoComplete="name" className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary" id="customerName" maxLength={NAME_MAX_LENGTH} {...register("customerName", { ...requiredText("Full name"), maxLength: { value: NAME_MAX_LENGTH, message: `Full name must be ${NAME_MAX_LENGTH} characters or fewer.` } })} /><FieldError id="customerName-error" message={errors.customerName?.message} /></label>
      <label className="block text-sm font-semibold" htmlFor="company">Company<input aria-describedby={describedBy("company-error", Boolean(errors.company))} aria-invalid={Boolean(errors.company)} autoComplete="organization" className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary" id="company" maxLength={COMPANY_MAX_LENGTH} {...register("company", { maxLength: { value: COMPANY_MAX_LENGTH, message: `Company must be ${COMPANY_MAX_LENGTH} characters or fewer.` } })} /><FieldError id="company-error" message={errors.company?.message} /></label>
      <label className="block text-sm font-semibold" htmlFor="email">Email address <span className="text-danger" aria-hidden="true">*</span><input aria-describedby={describedBy("email-error", Boolean(errors.email))} aria-invalid={Boolean(errors.email)} aria-required="true" autoComplete="email" className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary" id="email" maxLength={EMAIL_MAX_LENGTH} type="email" {...register("email", { validate: (value) => { const required = requiredText("Email address").validate(value); return required !== true ? required : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || "Enter a valid email address."; }, maxLength: { value: EMAIL_MAX_LENGTH, message: `Email address must be ${EMAIL_MAX_LENGTH} characters or fewer.` } })} /><FieldError id="email-error" message={errors.email?.message} /></label>
      <label className="block text-sm font-semibold" htmlFor="phone">Phone number<input aria-describedby={describedBy("phone-error", Boolean(errors.phone))} aria-invalid={Boolean(errors.phone)} autoComplete="tel" className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary" id="phone" maxLength={PHONE_MAX_LENGTH} type="tel" {...register("phone", { validate: (value) => { const phone = value.trim(); return !phone || (phone.length >= 7 && PHONE_PATTERN.test(phone)) || "Enter a valid phone number with at least 7 characters."; } })} /><FieldError id="phone-error" message={errors.phone?.message} /></label>
    </div>
    <label className="mt-5 block text-sm font-semibold" htmlFor="subject">Subject <span className="text-danger" aria-hidden="true">*</span><input aria-describedby={describedBy("subject-error", Boolean(errors.subject))} aria-invalid={Boolean(errors.subject)} aria-required="true" className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary" id="subject" maxLength={SUBJECT_MAX_LENGTH} {...register("subject", { ...requiredText("Subject", SUBJECT_MIN_LENGTH), maxLength: { value: SUBJECT_MAX_LENGTH, message: `Subject must be ${SUBJECT_MAX_LENGTH} characters or fewer.` } })} /><FieldError id="subject-error" message={errors.subject?.message} /></label>
    <label className="mt-5 block text-sm font-semibold" htmlFor="message">Message <span className="text-danger" aria-hidden="true">*</span><textarea aria-describedby={describedBy("message-error", Boolean(errors.message))} aria-invalid={Boolean(errors.message)} aria-required="true" className="mt-2 min-h-36 w-full rounded-xl border bg-background px-3 py-3 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary" id="message" maxLength={MESSAGE_MAX_LENGTH} {...register("message", { ...requiredText("Message", MESSAGE_MIN_LENGTH), maxLength: { value: MESSAGE_MAX_LENGTH, message: `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.` } })} /><FieldError id="message-error" message={errors.message?.message} /></label>
    <Button className="mt-6 w-full sm:w-auto" disabled={isSubmitting} type="submit">{isSubmitting ? "Completing prototype…" : "Complete prototype inquiry"}</Button>{isSubmitting ? <p aria-live="polite" className="mt-3 text-sm text-muted-foreground" role="status">Completing your prototype inquiry. No information is being sent.</p> : null}
  </form>;
}
