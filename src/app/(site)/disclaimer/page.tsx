import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "Affiliate Disclaimer & Legal Disclosure",
  description:
    "Full affiliate disclosure and legal disclaimer for mySmartCreditCard.com. Understand how we make money and how that may affect our content.",
};

export default function DisclaimerPage() {
  const year = new Date().getFullYear();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-wider mb-2">
          Legal
        </p>
        <h1
          className="text-4xl font-bold text-[#0F1E3D] mb-4"
          style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
        >
          Affiliate Disclaimer &amp; Legal Disclosure
        </h1>
        <div className="h-1 w-16 bg-[#C9A84C] rounded" />
        <p className="mt-4 text-sm text-gray-500">Last updated: January 1, {year}</p>
      </div>

      {/* Top Ad */}
      <div className="mb-10 flex justify-center">
        <AdBanner zone="leaderboard" />
      </div>

      {/* Content */}
      <div className="prose-article space-y-8 text-base text-gray-700">
        <section>
          <h2>Affiliate Disclosure</h2>
          <p>
            mySmartCreditCard.com participates in affiliate marketing programs, including credit card affiliate programs operated by card issuers and financial institutions. When you click on certain links on this website and are approved for a credit card, we may receive a commission or referral fee at no additional cost to you.
          </p>
          <p>
            This compensation may influence which products we feature and the placement of offers on the site. However, it does not affect the integrity of our reviews or recommendations. We strive to provide accurate, unbiased information regardless of any commercial relationship.
          </p>
        </section>

        <section>
          <h2>Editorial Independence</h2>
          <p>
            All editorial content on mySmartCreditCard.com, including reviews, guides, and recommendations, reflects our honest assessment based on research and analysis. Advertiser compensation does not dictate which products receive favorable treatment or how they are ranked.
          </p>
          <p>
            We do not guarantee that the offers shown on this site represent every available credit card offer. Card terms, rates, fees, and bonuses change frequently. Always verify the most current terms directly with the card issuer before applying.
          </p>
        </section>

        <section>
          <h2>Not Financial Advice</h2>
          <p>
            The content on mySmartCreditCard.com is for informational and educational purposes only. It does not constitute financial, legal, or investment advice. Credit card decisions involve personal financial considerations that vary by individual.
          </p>
          <p>
            We strongly encourage you to read all terms and conditions carefully before applying for any credit card. If you need personalized financial guidance, please consult a licensed financial advisor.
          </p>
        </section>

        <section>
          <h2>Credit Card Offers</h2>
          <p>
            Credit card offers featured on this site are subject to change without notice. Sign-up bonuses, annual fees, APRs, and rewards rates shown are believed to be accurate at time of publication but may have changed. The final terms are determined by the card issuer.
          </p>
          <p>
            All credit card applications are subject to credit approval by the issuing bank. Approval, credit limits, and specific terms depend on your creditworthiness and other factors determined by the issuer.
          </p>
        </section>

        <section>
          <h2>FTC Compliance</h2>
          <p>
            In accordance with the Federal Trade Commission (FTC) guidelines, we disclose our material connections with product and service providers. Links marked with{" "}
            <code className="text-sm bg-gray-100 px-1.5 py-0.5 rounded font-mono">rel=&quot;sponsored&quot;</code>{" "}
            indicate a commercial relationship.
          </p>
        </section>

        <section>
          <h2>Accuracy &amp; Updates</h2>
          <p>
            We work to keep our content current, but credit card offers change frequently. Publication dates are shown on articles to help you gauge freshness. When in doubt, always check directly with the card issuer for current terms.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            If you have questions about our editorial policies or affiliate relationships, you can reach us through the contact information on our{" "}
            <a href="/about" className="text-[#C9A84C] underline hover:text-[#0F1E3D]">
              About page
            </a>
            .
          </p>
        </section>
      </div>

      {/* Footer Ad */}
      <div className="mt-14 flex justify-center">
        <AdBanner zone="footer" />
      </div>
    </div>
  );
}
