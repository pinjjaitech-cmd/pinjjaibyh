import { Metadata } from 'next'
import StoryClient from './StoryClient';

export const metadata: Metadata = {
  title: 'Our Story - Preserving Traditional Crochet Craftsmanship',
  description: 'Discover the story of Pinjjai by H - from forgotten art to thriving movement. Learn how we\'re preserving traditional crochet craftsmanship in Punjab while empowering women artisans and creating sustainable livelihoods.',
  keywords: ['pinjjai story', 'traditional crafts', 'crochet heritage', 'women artisans punjab', 'craft preservation', 'sustainable livelihoods', 'empowerment through craft'],
  openGraph: {
    title: 'Our Story - Preserving Traditional Crochet Craftsmanship in Punjab',
    description: 'From forgotten art to thriving movement - discover how Pinjjai is preserving traditional crochet craftsmanship while empowering women artisans in Punjab.',
    url: '/story',
    images: [
      {
        url: '/og-story.jpg',
        width: 1200,
        height: 630,
        alt: 'Traditional crochet craftsmanship by women artisans in Punjab',
      },
    ],
  },
}

const StoryPage = () => {
  return <StoryClient />;
};

export default StoryPage;

