import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about mySmartCreditCard — our mission to help everyday travelers earn more points and travel smarter with the right credit cards.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[#D4A843] text-sm font-semibold uppercase tracking-wider mb-2">
          Our Story
        </p>
        <h1
          className="text-4xl font-bold text-[#1A1A2E] mb-4"
          style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}
        >
          About mySmartCreditCard
        </h1>
        <div className="h-1 w-16 bg-[#D4A843] rounded" />
      </div>

      {/* Top Ad */}
      <div className="mb-10 flex justify-center">
        <AdBanner zone="leaderboard" />
      </div>

      {/* Content */}
      <div className="prose-article space-y-6 text-base text-gray-700 leading-relaxed">
        <p>
          <strong>mySmartCreditCard</strong> was built for travelers who are tired of leaving points on the table. We believe that with the right credit card strategy, almost anyone can dramatically reduce the cost of travel — or eliminate it entirely.
        </p>

        <p>
          We cover everything from beginner-friendly starter cards to advanced strategies for maximizing airline miles and hotel points. Whether you&apos;re booking your first redemption or trying to crack the code on transferring Amex points to the right airline partner, we&apos;re here to help.
        </p>

        <h2>What We Cover</h2>
        <ul>
          <li>
            <strong>Travel cards:</strong> In-depth reviews of the best cards for flights, hotels, and everyday spend.
          </li>
          <li>
            <strong>Rewards strategies:</strong> How to earn more and redeem smarter across all the major programs.
          </li>
          <li>
            <strong>Beginners guides:</strong> Step-by-step content for people just getting started with travel rewards.
          </li>
          <li>
            <strong>Airline-specific picks:</strong> Deep dives on Delta, United, American, and other frequent flyer programs.
          </li>
          <li>
            <strong>Couples travel:</strong> How to coordinate cards between two people to maximize combined benefits.
          </li>
        </ul>

        <h2>Our Editorial Approach</h2>
        <p>
          Every article we publish is written with one goal: to give you accurate, actionable information you can actually use. We research sign-up bonuses, annual fees, earning rates, and redemption values so you don&apos;t have to spend hours doing it yourself.
        </p>
        <p>
          We also believe in full transparency. When we recommend a card, we tell you exactly why — and we&apos;re upfront about the limitations, too. Some links on this site are affiliate links, meaning we may earn a commission if you apply for a card. That commission never influences our editorial opinions.
        </p>

        <h2>A Note on Affiliate Links</h2>
        <p>
          Like most financial content sites, we use affiliate links to cards we cover. This helps keep the lights on and lets us continue publishing free content. We only recommend cards we&apos;d genuinely consider for our own wallets. For full details, see our{" "}
          <a href="/disclaimer" className="text-[#D4A843] underline hover:text-[#1A1A2E]">
            Affiliate Disclaimer
          </a>
          .
        </p>
      </div>

      {/* Footer Ad */}
      <div className="mt-14 flex justify-center">
        <AdBanner zone="footer" />
      </div>
    </div>
  );
}
