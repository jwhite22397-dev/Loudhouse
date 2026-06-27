export interface Program {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  url?: string;
  icon: string;
}

export const programs: Program[] = [
  {
    id: 'showcase',
    title: 'Showcase',
    subtitle: 'Frequency Check',
    description:
      'Frequency Check is a monthly artist showcase and competition highlighting emerging talent in Atlanta. Artists perform live for prizes, content, and the chance to level up their career.',
    cta: 'ENTER',
    icon: 'mic',
  },
  {
    id: 'distribution',
    title: 'Song Submission',
    subtitle: 'LoudHouse Music Group',
    description:
      'LoudHouse Music Group is an independent production and distribution label dedicated to elevating emerging and established artists. We provide full-service support from distribution to marketing to help artists grow sustainably and independently.',
    cta: 'ENTER',
    icon: 'upload',
  },
  {
    id: 'date-night',
    title: 'Date Night',
    subtitle: 'Create Together',
    description:
      'Bring your partner or your whole crew to LoudHouse Studios for a one-of-a-kind music-making experience. Create a song together, learn from a professional producer, and walk away with memories you\'ll replay forever.',
    cta: 'ENTER',
    icon: 'heart',
  },
  {
    id: 'internship',
    title: 'Internship',
    subtitle: 'Learn & Grow',
    description:
      'The LoudHouse Internship Program gives creatives hands-on experience in music, production, content creation, and studio operations. Interns work directly with our team to build real skills, real portfolios, and real industry connections.',
    cta: 'ENTER',
    icon: 'school',
  },
  {
    id: 'specials',
    title: 'Specials',
    subtitle: 'Limited Offers',
    description:
      'Limited-time offers, exclusive deals, and rotating studio promotions. Check back often for discounted sessions, bundles, and member-only opportunities.',
    cta: 'ENTER',
    icon: 'tag',
  },
];
