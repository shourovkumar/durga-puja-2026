import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { festival } from "@/data/festival";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__inner">
        <div>
          <p className="site-footer__brand">{festival.shortName}</p>
          <p className="site-footer__description">{festival.footer.description}</p>
        </div>

        <div className="site-footer__details">
          <a className="site-footer__contact" href={festival.footer.contactHref}>
            {festival.footer.contactLabel}
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.75} />
          </a>
          <p className="site-footer__legal">{festival.footer.legalLine}</p>
        </div>
      </Container>
    </footer>
  );
}
