import { Separator } from "@/components/ui/separator";
import { Instagram, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  Productos: [
    "Renta Fija",
    "Renta Variable",
    "Fondos de Inversión",
    "Mercado de Dinero",
  ],
  Empresa: ["Nosotros", "Equipo", "Carreras", "Beca CCI"],
  Legal: [
    "Términos de Uso",
    "Política de Privacidad",
    "Regulaciones",
    "Compliance",
  ],
};

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1200px] px-6 py-32">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <svg
                width="28"
                height="28"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="100" height="100" rx="16" fill="#ACD040" />
                <text
                  x="50"
                  y="62"
                  textAnchor="middle"
                  fontFamily="Inter"
                  fontWeight="700"
                  fontSize="40"
                  fill="#111118"
                >
                  CCI
                </text>
              </svg>
              <span className="text-sm font-semibold tracking-tight">
                CCI Puesto de Bolsa
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tu socio estratégico en inversiones. Miembro de la Bolsa de
              Valores de la República Dominicana.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              Miembro BVRD
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:text-white hover:border-white/20"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-sm font-semibold font-sans">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="link-underline text-sm text-muted-foreground transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            info@ccibolsa.com
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CCI Puesto de Bolsa, S.A. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
