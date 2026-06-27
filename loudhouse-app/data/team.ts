export interface TeamMember {
  id: string;
  name: string;
  nickname: string;
  role: string;
}

export const team: TeamMember[] = [
  { id: '1', name: 'Julian Leonard', nickname: 'Jules', role: 'Owner' },
  { id: '2', name: 'Rob Jewell', nickname: 'P', role: 'Owner' },
  { id: '3', name: 'Xavier Shamell', nickname: 'LoudHouse Juice', role: 'Engineer' },
  { id: '4', name: 'Cedrick Gervin', nickname: 'Ced G', role: 'Engineer' },
  { id: '5', name: 'Nile Brodie', nickname: 'Stodgy', role: 'Engineer' },
  { id: '6', name: 'Adrian Martinez', nickname: 'AdrianMares', role: 'Engineer' },
];
