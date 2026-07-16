import { APP_STORE_URL, PLAY_STORE_URL } from "../constants/appLinks";

export const siteConfig = {
  name: "PartyClub India",
  siteUrl: "https://partyclubapp.com",
  email: "support@partyclubindia.com",
  partnerUrl: "mailto:support@partyclubindia.com?subject=Partner%20with%20PartyClub",
  appStoreUrl: APP_STORE_URL,
  playStoreUrl: PLAY_STORE_URL,
  instagramUrl: "https://www.instagram.com/partyclubindia/",
} as const;

export const celebrationImages = {
  venue: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=82",
  decor: "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=1200&q=82",
  cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=82",
  dj: "https://images.unsplash.com/photo-1571266028243-d220c9c3b2d2?auto=format&fit=crop&w=1200&q=82",
  photography: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&w=1200&q=82",
  catering: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=82",
  wedding: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=84",
  party: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=84",
  birthday: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&w=1200&q=82",
  people: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1400&q=84",
} as const;
