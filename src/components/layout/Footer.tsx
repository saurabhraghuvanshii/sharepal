import { Headset, Heart, Mail } from "lucide-react";

import { Accordion } from "@/components/ui";
import {
  brand,
  footerCategories,
  footerLinks,
  footerSeo,
  socialLinks,
  supportLinks,
} from "@/config/site";

import { FooterSeo } from "./FooterSeo";
import { GoUpButton } from "./GoUpButton";
import { SocialIcon } from "./SocialIcon";

const categoryLinkClass =
  "text-b5 text-neutral-300 transition-colors duration-300 hover:text-gray-100 hover:underline md:text-[15px] md:leading-5";

const linkClass =
  "inline-flex items-center gap-2 py-2 text-b5 text-neutral-300 transition-colors duration-300 hover:text-gray-100 hover:underline md:py-3 md:text-[15px] md:leading-5";

/** Footer laid out after the owner's screenshots of the live site. */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 pt-8 pb-24 md:pt-14 lg:pb-8">
      <div className="container flex flex-col gap-6 md:gap-8">
        {/* Category columns — md+ grid */}
        <div className="hidden gap-x-10 gap-y-12 md:grid md:grid-cols-4 lg:grid-cols-5">
          {footerCategories.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-4 text-lg leading-7 font-semibold text-gray-100">
                {group.title}
              </h2>
              <ul className="flex flex-col gap-3.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={categoryLinkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Category columns — mobile accordion */}
        <Accordion
          className="md:hidden"
          headingLevel="h3"
          itemClassName="border-b border-primary-800"
          triggerClassName="py-3 text-sh5 text-gray-100"
          contentClassName="pb-3"
          items={footerCategories.map((group) => ({
            id: group.title,
            title: group.title,
            content: (
              <ul className="flex flex-col gap-2.5 pl-1">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={categoryLinkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ),
          }))}
        />

        <div className="md:mt-4">
          <FooterSeo content={footerSeo} />
        </div>

        {/* Wordmark + fading brand bar */}
        <div className="flex h-10 items-center">
          <span
            className="shrink-0 pr-6 font-ubuntu text-[1.75rem] leading-none font-bold tracking-tighter text-primary-500 italic md:text-[2rem]"
            aria-label={brand.name}
          >
            Share<span className="text-secondary-500">Pal</span>
          </span>
          <span
            className="h-full flex-1 bg-gradient-to-r from-primary-900 to-primary-800"
            aria-hidden="true"
          />
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {footerLinks.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-2 text-sh5 text-gray-100 md:mb-4 md:text-[15px] md:leading-5">
                {group.title}
              </h2>
              <ul className="flex flex-col">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                      {link.badge && (
                        <span className="-mt-2 rounded-full bg-secondary-500 px-2 py-px text-[11px] leading-4 font-semibold text-secondary-900">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="mb-2 text-sh5 text-gray-100 md:mb-4 md:text-[15px] md:leading-5">
              Need Help
            </h2>
            <ul className="flex flex-col">
              <li>
                <a href={supportLinks.contactSupport} className={linkClass}>
                  <Headset className="size-4" aria-hidden="true" />
                  Contact Support
                </a>
              </li>
              <li>
                <a href={supportLinks.contactUs} className={linkClass}>
                  Contact Us
                </a>
              </li>
              <li>
                <a href={supportLinks.email} className={linkClass}>
                  <Mail className="size-5" aria-hidden="true" />
                  {brand.supportEmail}
                </a>
              </li>
              <li className="flex items-center gap-4 pt-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${brand.name} on ${social.label} (opens in a new tab)`}
                    className="rounded-md text-neutral-300 transition-colors duration-300 hover:text-gray-100 focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:outline-none"
                  >
                    <SocialIcon network={social.label} className="size-6" />
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-4 border-t border-primary-700 py-6 text-b4 text-primary-300 max-md:flex-col md:text-[15px]">
          <GoUpButton />
          <p>
            © {year}. {brand.legalName}
          </p>
          <p className="flex items-center gap-1">
            Made with
            <Heart
              className="size-4 fill-destructive-500 text-destructive-500"
              aria-label="love"
            />
            for India
          </p>
        </div>
      </div>
    </footer>
  );
}
