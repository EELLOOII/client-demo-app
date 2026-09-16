"use client";

import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const [message, setMessage] = useState("");
  return <section className="mx-auto flex min-h-[55vh] max-w-md items-center py-10"><form className="w-full rounded-3xl border bg-background p-6 shadow-sm sm:p-8" noValidate onSubmit={(event) => { event.preventDefault(); setMessage("Prototype login complete. No credentials were checked, sent, or saved."); }}><LockKeyhole aria-hidden="true" className="size-8 text-primary" /><p className="mt-5 text-sm font-semibold uppercase tracking-[0.14em] text-primary">Admin portal</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Login preview</h1><p className="mt-3 text-sm leading-6 text-muted-foreground">This frontend prototype does not provide authentication. Entered values are not checked, sent, or saved.</p><label className="mt-6 block text-sm font-semibold" htmlFor="admin-email">Email address<input autoComplete="email" className="mt-2 h-11 w-full rounded-xl border bg-background px-3 font-normal outline-none focus:border-primary" id="admin-email" name="email" type="email" /></label><label className="mt-5 block text-sm font-semibold" htmlFor="admin-password">Password<input autoComplete="current-password" className="mt-2 h-11 w-full rounded-xl border bg-background px-3 font-normal outline-none focus:border-primary" id="admin-password" name="password" type="password" /></label>{message ? <p aria-live="polite" className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-success" role="status">{message}</p> : null}<div className="mt-6 flex flex-wrap gap-3"><Button type="submit">Preview login</Button><Button asChild variant="outline"><Link href="/admin">Continue to admin</Link></Button></div></form></section>;
}
