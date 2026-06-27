import { StudioSection, StudioEvent } from './types';
import { gradients } from '../theme/theme';

export const sections: StudioSection[] = [
  {
    id: 'showcase',
    title: 'Frequency Check',
    subtitle: 'Monthly Artist Showcase',
    description:
      'Frequency Check is a monthly artist showcase and competition highlighting emerging talent in Atlanta. Artists perform live for prizes, content, and the chance to level up their career.',
    cta: 'Enter Showcase',
    icon: 'mic',
    gradient: gradients.cosmic,
    bullets: ['Live performance slots', 'Cash & studio prizes', 'Pro video content', 'Industry judges'],
  },
  {
    id: 'label',
    title: 'Song Submission',
    subtitle: 'LoudHouse Music Group',
    description:
      'LoudHouse Music Group is an independent production and distribution label dedicated to elevating emerging and established artists. We provide full-service support from distribution to marketing to help artists grow sustainably and independently.',
    cta: 'Submit Your Song',
    icon: 'cloud-upload',
    gradient: gradients.aurora,
    bullets: ['Global distribution', 'Marketing support', 'Keep your masters', 'A&R feedback'],
  },
  {
    id: 'datenight',
    title: 'Date Night',
    subtitle: 'Make Music Together',
    description:
      'Bring your partner or your whole crew to LoudHouse Studios for a one-of-a-kind music-making experience. Create a song together, learn from a professional producer, and walk away with memories you’ll replay forever.',
    cta: 'Book Date Night',
    icon: 'heart',
    gradient: gradients.sunset,
    bullets: ['2-hour guided session', 'Take home your song', 'Producer included', 'Drinks & snacks'],
  },
  {
    id: 'internship',
    title: 'Internship',
    subtitle: 'Learn The Industry',
    description:
      'The LoudHouse Internship Program gives creatives hands-on experience in music, production, content creation, and studio operations. Interns work directly with our team to build real skills, real portfolios, and real industry connections.',
    cta: 'Apply Now',
    icon: 'school',
    gradient: gradients.cosmic,
    bullets: ['Hands-on training', 'Build a portfolio', 'Industry connections', 'Real studio work'],
  },
  {
    id: 'specials',
    title: 'Specials',
    subtitle: 'Limited-Time Offers',
    description:
      'Limited-time offers, exclusive deals, and rotating studio promotions. Check back often for discounted sessions, bundles, and member-only opportunities.',
    cta: 'View Deals',
    icon: 'pricetags',
    gradient: gradients.aurora,
    bullets: ['Off-peak discounts', 'Session bundles', 'Member perks', 'Referral rewards'],
  },
];

export const events: StudioEvent[] = [
  {
    id: 'e1',
    title: 'Frequency Check — July',
    date: 'Jul 12, 2026',
    time: '8:00 PM',
    location: 'LoudHouse Studios, Atlanta',
    description: 'Our monthly artist showcase & competition. Doors at 7. Limited tickets.',
    color: '#8A5CFF',
  },
  {
    id: 'e2',
    title: 'Producer Workshop: 808 Mastery',
    date: 'Jul 19, 2026',
    time: '2:00 PM',
    location: 'Saturn Production Lab',
    description: 'Learn to design, tune, and mix 808s that hit. Hands-on with our producers.',
    color: '#36E0E0',
  },
  {
    id: 'e3',
    title: 'Open Mic & Networking',
    date: 'Jul 26, 2026',
    time: '7:30 PM',
    location: 'LoudHouse Lounge',
    description: 'Connect with Atlanta creatives. Perform, collab, and build your network.',
    color: '#FF5CA8',
  },
];
