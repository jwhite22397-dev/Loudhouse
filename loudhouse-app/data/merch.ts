export interface MerchItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes?: string[];
  preOrder: boolean;
}

export const merchItems: MerchItem[] = [
  {
    id: 'tshirt',
    name: 'LoudHouse T-Shirt',
    price: 19.99,
    image: 'https://static.wixstatic.com/media/c88063_efd1370d647642e99217b874611ee9cd~mv2.png/v1/fill/w_400,h_400,al_c,q_85/c88063_efd1370d647642e99217b874611ee9cd~mv2.png',
    description: 'Official LoudHouse Studios tee. Premium cotton, bold logo front print.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    preOrder: true,
  },
  {
    id: 'hoodie',
    name: 'LoudHouse Hoodie',
    price: 39.99,
    image: 'https://static.wixstatic.com/media/c88063_efd1370d647642e99217b874611ee9cd~mv2.png/v1/fill/w_400,h_400,al_c,q_85/c88063_efd1370d647642e99217b874611ee9cd~mv2.png',
    description: 'Official LoudHouse Studios hoodie. Heavyweight fleece, embroidered logo.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    preOrder: true,
  },
];

export const SHOP_URL = 'https://www.loudhousestudios.com/category/all-products';
