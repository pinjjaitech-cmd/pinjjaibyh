import { Metadata } from 'next'
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us - Meet the Women Artisans Behind Pinjjai',
  description: 'Learn about Pinjjai by H, founded by Harman Seera to empower women artisans in Punjab. Discover our journey of preserving traditional crochet craftsmanship while creating sustainable livelihoods for rural communities.',
  keywords: ['about pinjjai', 'women artisans', 'Harman Seera', 'craftsmanship heritage', 'Punjab artisans', 'fair trade', 'empowerment', 'traditional crafts'],
  openGraph: {
    title: 'About Pinjjai by H - Empowering Women Artisans in Punjab',
    description: 'Meet the women artisans behind Pinjjai. Learn our story of preserving traditional crochet craftsmanship and creating sustainable livelihoods in rural Punjab.',
    url: '/about',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
        alt: 'Women artisans crafting crochet bags at Pinjjai',
      },
    ],
  },
}

const AboutPage = () => {
  return <AboutClient />;
};

export default AboutPage;
