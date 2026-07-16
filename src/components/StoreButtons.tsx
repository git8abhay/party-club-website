import { ArrowDownToLine } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

type StoreButtonsProps = { compact?: boolean; className?: string };

export default function StoreButtons({ compact = false, className = "" }: StoreButtonsProps) {
  return (
    <div className={`store-buttons ${className}`} aria-label="Download PartyClub">
      <a className={`store-badge ${compact ? "is-compact" : ""}`} href={siteConfig.appStoreUrl} target="_blank" rel="noreferrer" aria-label="Download PartyClub on the App Store">
        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" />
      </a>
      <a className={`store-badge ${compact ? "is-compact" : ""}`} href={siteConfig.playStoreUrl} target="_blank" rel="noreferrer" aria-label="Get PartyClub on Google Play">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" />
      </a>
      {!compact && <ArrowDownToLine className="store-download-icon" aria-hidden="true" />}
    </div>
  );
}
