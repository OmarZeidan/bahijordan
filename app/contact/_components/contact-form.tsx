"use client";

import { sendEmail } from "@/app/actions/send-email";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircleIcon, CheckCircle2Icon, Send } from "lucide-react";
import { useActionState } from "react";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendEmail, {
    success: false,
    error: null as string | null,
  });

  return (
    <form
      action={formAction}
      className="w-full space-y-6"
      aria-label="Contact form"
    >
      {/* honeypot */}
      <input
        type="text"
        name="company"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* name */}
      <div className="grid w-full items-center gap-2.5">
        <Label
          className="text-[11px] font-medium tracking-wide text-primary-900/75 dark:text-primary-50/75"
          htmlFor="name"
        >
          Your name
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          placeholder="e.g. Sara Khalil"
          className="h-11 border border-primary-900/15 bg-white/50 px-3.5 text-sm text-primary-900 transition-colors placeholder:text-primary-900/35 focus:border-primary-900/30 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-white/15 dark:bg-white/5 dark:text-primary-50 dark:placeholder:text-primary-100/40 dark:focus:border-white/25 dark:focus:bg-white/[0.07]"
          required
        />
      </div>

      {/* email */}
      <div className="grid w-full items-center gap-2.5">
        <Label
          className="text-[11px] font-medium tracking-wide text-primary-900/75 dark:text-primary-50/75"
          htmlFor="email"
        >
          Your email
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          placeholder="e.g. you@example.com"
          className="h-11 border border-primary-900/15 bg-white/50 px-3.5 text-sm text-primary-900 transition-colors placeholder:text-primary-900/35 focus:border-primary-900/30 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-white/15 dark:bg-white/5 dark:text-primary-50 dark:placeholder:text-primary-100/40 dark:focus:border-white/25 dark:focus:bg-white/[0.07]"
          required
        />
      </div>

      {/* phone */}
      <div className="grid w-full items-center gap-2.5">
        <Label
          className="text-[11px] font-medium tracking-wide text-primary-900/75 dark:text-primary-50/75"
          htmlFor="tel"
        >
          Phone (optional)
        </Label>
        <Input
          type="tel"
          id="tel"
          name="tel"
          autoComplete="tel"
          placeholder="e.g. +962 7X XXX XXXX"
          className="h-11 border border-primary-900/15 bg-white/50 px-3.5 text-sm text-primary-900 transition-colors placeholder:text-primary-900/35 focus:border-primary-900/30 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-white/15 dark:bg-white/5 dark:text-primary-50 dark:placeholder:text-primary-100/40 dark:focus:border-white/25 dark:focus:bg-white/[0.07]"
        />
      </div>

      {/* message */}
      <div className="grid w-full gap-2.5">
        <Label
          className="text-[11px] font-medium tracking-wide text-primary-900/75 dark:text-primary-50/75"
          htmlFor="message"
        >
          Your message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your visit, gathering, or idea for the space."
          className="min-h-32 border border-primary-900/15 bg-white/50 px-3.5 py-3 text-sm text-primary-900 transition-colors placeholder:text-primary-900/35 focus:border-primary-900/30 focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-white/15 dark:bg-white/5 dark:text-primary-50 dark:placeholder:text-primary-100/40 dark:focus:border-white/25 dark:focus:bg-white/[0.07]"
          required
        />
      </div>

      {/* secondary card: what to mention */}
      <div className="border border-primary-900/10 bg-white/20 px-5 py-5 text-xs text-primary-800/70 dark:border-white/10 dark:bg-white/1 dark:text-primary-100/70 rounded-xl">
        <h3 className="mb-3 text-sm font-medium text-primary-900 dark:text-primary-50">
          Helpful to mention
        </h3>
        <ul className="space-y-2 list-disc pl-4 marker:text-primary-900/40 dark:marker:text-primary-100/40">
          <li>Approximate date and time you have in mind</li>
          <li>
            Size of your group or type of visit (solo work, meeting, book club,
            etc.)
          </li>
          <li>Any special requests or accessibility notes</li>
        </ul>
      </div>

      {/* footer row */}
      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] leading-relaxed text-primary-900/60 dark:text-primary-50/60 max-w-[60ch]">
          Your details are only used to reply to your message.
        </p>

        <Button
          type="submit"
          className="inline-flex items-center gap-2 border border-primary-900 bg-primary-900 px-5 py-2.5 text-sm font-medium tracking-normal text-white transition-all hover:bg-primary-800 hover:border-primary-800 disabled:opacity-60 disabled:cursor-not-allowed dark:border-primary-50 dark:bg-primary-50 dark:text-primary-900 dark:hover:bg-primary-100 dark:hover:border-primary-100"
          disabled={pending}
        >
          {pending ? (
            <>
              <Spinner className="mr-1 h-4 w-4" />
              Sending…
            </>
          ) : (
            <>
              Send
              <Send className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {/* success state */}
      {state.success && (
        <Alert className="border border-emerald-600/20 bg-emerald-50/50 text-emerald-900 dark:border-emerald-400/25 dark:bg-emerald-950/25 dark:text-emerald-50">
          <CheckCircle2Icon className="h-4 w-4" />
          <AlertTitle className="text-sm font-medium">
            Thank you, we received your note.
          </AlertTitle>
          <AlertDescription className="text-xs leading-relaxed">
            Someone from Bahi will reply as soon as we can, usually within the
            same or next day.
          </AlertDescription>
        </Alert>
      )}

      {/* error state */}
      {state.error && (
        <Alert
          variant="destructive"
          className="border border-red-600/25 bg-red-50/50 text-red-900 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-50"
        >
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle className="text-sm font-medium">
            Something went wrong
          </AlertTitle>
          <AlertDescription className="text-xs leading-relaxed">
            {state.error ||
              "Your message couldn't be delivered. Please check your details and try again in a moment."}
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
}
