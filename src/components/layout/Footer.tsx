import { Headset, Mail } from "lucide-react";

import { Accordion } from "@/components/ui";
import {
  brand,
  footerCategories,
  footerLinks,
  socialLinks,
  supportLinks,
} from "@/config/site";

import { GoUpButton } from "./GoUpButton";

const linkClass =
  "text-b6 text-neutral-300 transition-colors duration-300 hover:text-gray-100 hover:underline md:text-b4";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 py-5 pb-24 md:py-[72px] md:pb-10 lg:pb-10">
      <div className="container flex flex-col gap-5 md:gap-12">
        {/* Category columns — desktop grid */}
        <div className="hidden gap-10 md:grid md:grid-cols-4 lg:grid-cols-5">
          {footerCategories.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold text-gray-100">
                {group.title}
              </h2>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
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
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ),
          }))}
        />

        <div className="flex items-center">
          <span className="font-ubuntu text-2xl font-bold tracking-tight text-primary-400">
            share<span className="text-secondary-500">pal</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h2 className="mb-3 text-sh4 text-gray-100 md:mb-6">
                {group.title}
              </h2>
              <ul className="flex flex-col">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 py-1.5 text-b6 text-neutral-300 transition-colors duration-300 hover:text-primary-100 hover:underline md:py-3 md:text-b4"
                    >
                      {link.label}
                      {link.badge && (
                        <span className="rounded-full bg-secondary-500 px-1.5 py-px text-[10px] leading-4 font-bold text-secondary-900">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="mb-3 text-sh4 text-gray-100 md:mb-6">Need Help</h2>
            <ul className="flex flex-col text-neutral-300">
              <li>
                <a
                  href={supportLinks.contactUs}
                  className="flex items-center gap-2 py-1.5 text-b6 transition-colors duration-300 hover:text-gray-100 md:py-3 md:text-b4"
                >
                  <Headset className="size-4" aria-hidden="true" />
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href={supportLinks.email}
                  className="flex items-center gap-2 py-1.5 text-b6 transition-colors duration-300 hover:text-gray-100 md:py-3 md:text-b4"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  {brand.supportEmail}
                </a>
              </li>
              <li className="flex flex-wrap items-center gap-2 py-1.5 md:py-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${brand.name} on ${social.label} (opens in a new tab)`}
                    className="rounded-full border border-primary-700 px-2.5 py-1 text-b6 text-neutral-300 transition-colors hover:border-primary-400 hover:text-gray-100"
                  >
                    {social.label}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-4 border-t border-primary-700 py-6 text-sm font-medium text-primary-300 max-md:flex-col">
          <GoUpButton />
          <p>
            © {year}. {brand.legalName}
          </p>
          <p>{brand.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
