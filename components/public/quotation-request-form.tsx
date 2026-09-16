"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { prototypeQuotationSubmission } from "@/mock/quotation-submission";
import type { QuotationRequestFormValues } from "@/types/quotation";

const NAME_MAX_LENGTH = 120;
const COMPANY_MAX_LENGTH = 120;
const EMAIL_MAX_LENGTH = 254;
const PHONE_MAX_LENGTH = 32;
const PRODUCT_MAX_LENGTH = 160;
const QUANTITY_MAX_LENGTH = 60;
const REQUIREMENTS_MIN_LENGTH = 10;
const REQUIREMENTS_MAX_LENGTH = 2_000;
const PHONE_PATTERN = /^[+()\d][+()\d\s.-]*$/;

interface QuotationRequestFormProps {
  product?: string;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p className="mt-2 text-sm font-medium text-danger" id={id}>{message}</p> : null;
}

function requiredText(label: string, minimum?: number) {
  return {
    validate: (value: string) => {
      const normalized = value.trim();
      if (!normalized) return `${label} is required.`;
      return !minimum || normalized.length >= minimum || `${label} must be at least ${minimum} characters.`;
    },
  };
}

export function QuotationRequestForm({ product = "" }: QuotationRequestFormProps) {
  const [submissionError, setSubmissionError] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const defaultValues: QuotationRequestFormValues = { customerName: "", company: "", email: "", phone: "", product, quantity: "", requirements: "" };
  const { formState: { errors, isSubmitting }, handleSubmit, register, reset } = useForm<QuotationRequestFormValues>({ defaultValues, shouldFocusError: true });
  const onSubmit: SubmitHandler<QuotationRequestFormValues> = async (values) => {
    if (isSubmitting) return;
    setSubmissionError(false);
    try {
      await prototypeQuotationSubmission.submit({
        customerName: values.customerName.trim(), company: values.company.trim(), email: values.email.trim(), phone: values.phone.trim(), product: values.product.trim(), quantity: values.quantity.trim(), requirements: values.requirements.trim(),
      });
      setIsComplete(true);
    } catch {
      setSubmissionError(true);
    }
  };
  const describedBy = (errorId: string, hasError: boolean) => hasError ? errorId : undefined;

  if (isComplete) return <section aria-labelledby="quotation-complete-title" className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-success">Quotation prototype</p><h2 className="mt-3 text-2xl font-bold" id="quotation-complete-title">Request complete</h2><p aria-live="polite" className="mt-3 text-muted-foreground">Your request has been completed for this prototype. No quotation request was sent or saved.</p><Button className="mt-6" onClick={() => { reset(defaultValues); setSubmissionError(false); setIsComplete(false); }}>Create another prototype request</Button></section>;

  return <form aria-labelledby="quotation-form-title" className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8" noValidate onSubmit={handleSubmit(onSubmit)}>
    <div><h2 className="text-2xl font-bold" id="quotation-form-title">Tell us what you need</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Fields marked <span aria-hidden="true">*</span><span className="sr-only">required</span> are required. This form is a frontend prototype only.</p></div>
    {submissionError ? <div aria-live="assertive" className="mt-6 rounded-xl border border-danger/30 bg-red-50 p-4 text-sm text-danger" role="alert">We could not complete the prototype request. Your information is still here—please try again.</div> : null}
    <div className="mt-6 grid gap-5 sm:grid-cols-2">
      <label className="block text-sm font-semibold" htmlFor="customerName">Full name <span aria-hidden="true" className="text-danger">*</span><input aria-describedby={describedBy("customerName-error", Boolean(errors.customerName))} aria-invalid={Boolean(errors.customerName)} aria-required="true" autoComplete="name" className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary" id="customerName" maxLength={NAME_MAX_LENGTH} {...register("customerName", { ...requiredText("Full name"), maxLength: { value: NAME_MAX_LENGTH, message: `Full name must be ${NAME_MAX_LENGTH} characters or fewer.` } })} /><FieldError id="customerName-error" message={errors.customerName?.message} /></label>
      <label className="block text-sm font-semibold" htmlFor="company">Company<input aria-describedby={describedBy("company-error", Boolean(errors.company))} aria-invalid={Boolean(errors.company)} autoComplete="organization" className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary" id="company" maxLength={COMPANY_MAX_LENGTH} {...register("company", { maxLength: { value: COMPANY_MAX_LENGTH, message: `Company must be ${COMPANY_MAX_LENGTH} characters or fewer.` } })} /><FieldError id="company-error" message={errors.company?.message} /></label>
      <label className="block text-sm font-semibold" htmlFor="email">Email address <span aria-hidden="true" className="text-danger">*</span><input aria-describedby={describedBy("email-error", Boolean(errors.email))} aria-invalid={Boolean(errors.email)} aria-required="true" autoComplete="email" className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary" id="email" maxLength={EMAIL_MAX_LENGTH} type="email" {...register("email", { validate: (value) => { const required = requiredText("Email address").validate(value); return required !== true ? required : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || "Enter a valid email address."; }, maxLength: { value: EMAIL_MAX_LENGTH, message: `Email address must be ${EMAIL_MAX_LENGTH} characters or fewer.` } })} /><FieldError id="email-error" message={errors.email?.message} /></label>
      <label className="block text-sm font-semibold" htmlFor="phone">Phone number<input aria-describedby={describedBy("phone-error", Boolean(errors.phone))} aria-invalid={Boolean(errors.phone)} autoComplete="tel" className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary" id="phone" maxLength={PHONE_MAX_LENGTH} type="tel" {...register("phone", { validate: (value) => { const phone = value.trim(); return !phone || (phone.length >= 7 && PHONE_PATTERN.test(phone)) || "Enter a valid phone number with at least 7 characters."; } })} /><FieldError id="phone-error" message={errors.phone?.message} /></label>
    </div>
    <div className="mt-5 grid gap-5 sm:grid-cols-2">
      <label className="block text-sm font-semibold" htmlFor="product">Product or service <span aria-hidden="true" className="text-danger">*</span><input aria-describedby={describedBy("product-error", Boolean(errors.product))} aria-invalid={Boolean(errors.product)} aria-required="true" className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary" id="product" maxLength={PRODUCT_MAX_LENGTH} {...register("product", { ...requiredText("Product or service"), maxLength: { value: PRODUCT_MAX_LENGTH, message: `Product or service must be ${PRODUCT_MAX_LENGTH} characters or fewer.` } })} /><FieldError id="product-error" message={errors.product?.message} /></label>
      <label className="block text-sm font-semibold" htmlFor="quantity">Estimated quantity<input aria-describedby={describedBy("quantity-error", Boolean(errors.quantity))} aria-invalid={Boolean(errors.quantity)} className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary" id="quantity" maxLength={QUANTITY_MAX_LENGTH} placeholder="For example, 20 units" {...register("quantity", { maxLength: { value: QUANTITY_MAX_LENGTH, message: `Estimated quantity must be ${QUANTITY_MAX_LENGTH} characters or fewer.` } })} /><FieldError id="quantity-error" message={errors.quantity?.message} /></label>
    </div>
    <label className="mt-5 block text-sm font-semibold" htmlFor="requirements">Requirements <span aria-hidden="true" className="text-danger">*</span><textarea aria-describedby={describedBy("requirements-error", Boolean(errors.requirements))} aria-invalid={Boolean(errors.requirements)} aria-required="true" className="mt-2 min-h-36 w-full rounded-xl border bg-background px-3 py-3 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary" id="requirements" maxLength={REQUIREMENTS_MAX_LENGTH} placeholder="Include specifications, delivery expectations, or other details." {...register("requirements", { ...requiredText("Requirements", REQUIREMENTS_MIN_LENGTH), maxLength: { value: REQUIREMENTS_MAX_LENGTH, message: `Requirements must be ${REQUIREMENTS_MAX_LENGTH} characters or fewer.` } })} /><FieldError id="requirements-error" message={errors.requirements?.message} /></label>
    <Button className="mt-6 w-full sm:w-auto" disabled={isSubmitting} type="submit">{isSubmitting ? "Completing prototype…" : "Complete prototype request"}</Button>{isSubmitting ? <p aria-live="polite" className="mt-3 text-sm text-muted-foreground" role="status">Completing your prototype request. No information is being sent.</p> : null}
  </form>;
}
