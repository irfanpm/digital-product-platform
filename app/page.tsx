import CreatorStorefront from '@/components/CreatorStorefront';
import dbConnect from '@/lib/dbConnect';
import Setting from '@/models/Setting';
import { PRODUCT } from '@/lib/product';
import './creator.css';
export default async function HomePage() {
  let price: number | undefined;
  try { if (await dbConnect()) { const s = await Setting.findOne({}).lean(); if (s && Number.isFinite(s.basePrice) && s.basePrice > 0) price = s.basePrice; } } catch {}
  const data = { '@context': 'https://schema.org', '@type': 'Product', name: PRODUCT.name, description: PRODUCT.description, image: '/images/creator/social.webp', ...(price ? { offers: { '@type': 'Offer', price, priceCurrency: 'INR' } } : {}) };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} /><CreatorStorefront /></>;
}
