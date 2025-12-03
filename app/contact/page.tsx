import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./_components/contact-form";
import { SITE_INFO } from "@/lib/constants";
import { Divider } from "@/components/subtle-divider";

export const metadata: Metadata = {
  title: "Contact – Bahi Café, Amman",
  description:
    "Get in touch with Bahi Café in Shmeisani, Amman. A calm room for everyday rituals, meetings, and slow coffee.",
  openGraph: {
    title: "Contact – Bahi Café, Amman",
    description:
      "Questions, collaborations, or private gatherings at Bahi Café in Amman? Send us a note — we’d love to hear from you.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Bahi Café in Shmeisani, Amman",
      },
    ],
    url: "/contact",
    siteName: "Bahi Café",
  },
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section
      aria-label="Contact Bahi Café"
      className="relative overflow-hidden bg-background"
    >
      {/* subtle texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-soft-light bg-[url('/images/noise.png')] bg-[length:220px]" />

      <div className="container-inner relative py-20 md:py-28 lg:py-32">
        {/* top label + heading */}
        <header className="mb-14 space-y-7 md:mb-16">
          <div className="inline-flex items-center gap-2.5 border-b border-primary-900/10 pb-2 text-[10.5px] tracking-[0.25em] uppercase dark:border-white/10">
            <span className="h-1 w-1 rounded-full bg-primary-900/60 dark:bg-primary-50/60" />
            <span className="text-primary-800/70 dark:text-primary-50/70">
              Bahi Café · Shmeisani, Amman
            </span>
          </div>

          <div className="space-y-5">
            <p className="eyebrow">Contact</p>
            <h1 className="section-heading text-balance">
              Send a note or reach us directly
            </h1>
            <p className="section-description max-w-2xl">
              Planning a gathering, exploring a collaboration, or just curious
              about the space? Share a few details here or use the direct
              contacts on the right — we&apos;ll come back to you as soon as we
              can.
            </p>
          </div>
        </header>

        {/* main layout */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)] lg:gap-8">
          {/* LEFT: form section */}
          <div className="rounded-3xl border border-primary-200/60 bg-white/80 px-6 py-8 backdrop-blur dark:border-white/10 dark:bg-white/5 md:px-8 md:py-10">
            <div className="h-px w-12 bg-gradient-to-r from-amber-200 to-primary-500 opacity-90" />
            <div className="space-y-2 pt-4">
              <h2 className="text-xl font-medium tracking-tight text-primary-900 dark:text-primary-50 md:text-2xl">
                Send an enquiry
              </h2>
              <p className="text-sm text-primary-800/70 dark:text-primary-100/70">
                Planning a gathering, have a question about our menu, or just
                want to say hello? Send us a message; we&apos;d love to hear
                from you.
              </p>
            </div>

            <Divider className="my-0" />

            <ContactForm />
          </div>

          {/* RIGHT: immediate contact + what to include */}
          <div className="space-y-6">
            {/* primary contact card */}
            <div className="rounded-3xl border border-primary-200/60 bg-white/80 px-6 py-7 backdrop-blur dark:border-white/10 dark:bg-white/5 md:px-7 md:py-8">
              <div className="h-px w-12 bg-linear-to-r from-amber-200 to-primary-500 opacity-90" />
              <div className="space-y-2 pt-4">
                <h2 className="text-lg font-medium tracking-tight text-primary-900 dark:text-primary-50">
                  Prefer to talk now?
                </h2>
                <p className="text-sm text-primary-800/70 dark:text-primary-100/70">
                  You can reach us directly during opening hours. Outside of
                  them, we&apos;ll get back to you as soon as we see your
                  message.
                </p>
              </div>

              <div className="space-y-4 mt-3">
                {/* phone */}
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg border border-primary-900/10 bg-white/50 dark:border-white/10 dark:bg-white/5">
                    <Phone className="h-4 w-4 text-primary-900/70 dark:text-primary-100/70" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-800/60 dark:text-primary-200/60">
                      Phone Number
                    </p>
                    <p className="text-sm font-medium text-primary-900 dark:text-primary-50">
                      <Link
                        href={`tel:${SITE_INFO.phoneNumber}`}
                        className="transition-colors hover:text-primary-700 dark:hover:text-primary-200"
                      >
                        {SITE_INFO.phoneNumber}
                      </Link>
                    </p>
                    <p className="text-xs text-primary-800/60 dark:text-primary-100/60">
                      For quick questions, directions, or table-size gatherings.
                    </p>
                  </div>
                </div>

                {/* email */}
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg border border-primary-900/10 bg-white/50 dark:border-white/10 dark:bg-white/5">
                    <Mail className="h-4 w-4 text-primary-900/70 dark:text-primary-100/70" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-800/60 dark:text-primary-200/60">
                      E-Mail
                    </p>
                    <p className="text-sm font-medium text-primary-900 dark:text-primary-50">
                      <Link
                        href={`mailto:${SITE_INFO.emailAddress}`}
                        className="transition-colors hover:text-primary-700 dark:hover:text-primary-200"
                      >
                        {SITE_INFO.emailAddress}
                      </Link>
                    </p>
                    <p className="text-xs text-primary-800/60 dark:text-primary-100/60">
                      Ideal for collaborations, press, and longer notes.
                    </p>
                  </div>
                </div>

                {/* instagram with custom icon */}
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg border border-primary-900/10 bg-white/50 dark:border-white/10 dark:bg-white/5">
                    <svg
                      viewBox="0 0 256 256"
                      aria-hidden="true"
                      fill="currentColor"
                      className="h-4 w-4 text-primary-900/70 dark:text-primary-100/70"
                    >
                      <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-800/60 dark:text-primary-200/60">
                      Instagram
                    </p>
                    <p className="text-sm font-medium text-primary-900 dark:text-primary-50">
                      <Link
                        href={SITE_INFO.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-primary-700 dark:hover:text-primary-200"
                      >
                        @bahi.amman
                      </Link>
                    </p>
                    <p className="text-xs text-primary-800/60 dark:text-primary-100/60">
                      Latest opening hours, today&apos;s mood, and small
                      announcements.
                    </p>
                  </div>
                </div>

                {/* location / coverage */}
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg border border-primary-900/10 bg-white/50 dark:border-white/10 dark:bg-white/5">
                    <MapPin className="h-4 w-4 text-primary-900/70 dark:text-primary-100/70" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-800/60 dark:text-primary-200/60">
                      Address
                    </p>
                    <p className="text-sm font-medium text-primary-900 dark:text-primary-50">
                      Shmeisani, Amman
                    </p>
                    <p className="text-xs text-primary-800/60 dark:text-primary-100/60">
                      Quiet corner just off the main streets.{" "}
                      <Link
                        href={SITE_INFO.mapLocation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border-b border-primary-800/30 transition-colors hover:border-primary-800/60 dark:border-primary-100/30 dark:hover:border-primary-100/60"
                      >
                        Open in Google Maps
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* opening hours */}
            <div className="rounded-3xl border border-primary-200/60 bg-white/80 px-5 py-5 text-xs text-primary-800/70 backdrop-blur dark:border-white/10 dark:bg-white/[0.02] dark:text-primary-100/70">
              <div className="h-px w-12 bg-gradient-to-r from-amber-200 to-primary-500 opacity-90" />
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary-900/60 dark:text-primary-200/60" />
                  <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary-900/80 dark:text-primary-50/80">
                    Opening hours
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* Mon–Thu, Sat */}
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-primary-900/75 dark:text-primary-100/75">
                      Mon – Thu, Sat
                    </span>
                    <span className="text-primary-900/60 dark:text-primary-100/60 sm:text-right">
                      7:00 am – 11:30 pm
                    </span>
                  </div>

                  {/* Friday (split time) */}
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-primary-900/75 dark:text-primary-100/75">
                      Friday
                    </span>
                    <span className="text-primary-900/60 dark:text-primary-100/60 sm:text-right">
                      7:00 am – Friday&apos;s prayers &nbsp;·&nbsp; After
                      prayers – 11:30 pm
                    </span>
                  </div>

                  {/* Sunday */}
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-primary-900/75 dark:text-primary-100/75">
                      Sunday
                    </span>
                    <span className="text-primary-900/60 dark:text-primary-100/60 sm:text-right">
                      7:00 am – 12:30 am
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-[11px] leading-relaxed text-primary-900/55 dark:text-primary-100/55">
                  Times may occasionally shift for special events or holidays.
                  For the latest updates, please check our Instagram stories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
