export interface Product {
  id: string;
  badge?: string;
  name: string;
  tagline: string;
  description: string;
  image?: string;
  specs: {
    origin?: string;
    packaging?: string;
    certificate?: string;
    moq?: string;
    grade?: string;
    brix?: string;
    acidity?: string;
    shelfLife?: string;
    storage?: string;
    [key: string]: string | undefined;
  };
  ctaText: string;
  ctaLink?: string;
  accent?: 'amber' | 'emerald' | 'forest' | 'terracotta';
}

export interface Brand {
  id: string;
  category: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  brandProfilePdf: string;
  introImage: string;
  secondaryImage?: string;
  imagePosition?: 'left' | 'right';
  additionalSections?: {
    title: string;
    items: string[];
  }[];
  products: Product[];
}

export const BRANDS_DATA: Brand[] = [
  {
    id: 'kerazone',
    category: 'Kerala Heritage',
    name: 'KeraZone',
    tagline: 'Pure Goodness from Kerala',
    description: 'Rooted in the biodiversity of Kerala, KeraZone brings you nature’s most potent ingredients. From our signature Virgin Coconut Oil to rare Stingless Bee Honey, every product tells a story of conservation and purity.',
    features: ['Ethically Sourced', 'Export Quality'],
    brandProfilePdf: '/HARVEN-Profil26b_compressed.pdf',
    introImage: 'https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?w=1200&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80',
    imagePosition: 'right',
    additionalSections: [
      {
        title: 'Sustainable Farming',
        items: ['Preserving Natural Biodiversity']
      },
      {
        title: 'The King of Spices',
        items: ['High volatile oil content']
      }
    ],
    products: [
      {
        id: 'kerazone-honey',
        badge: 'Rare',
        name: 'Black Stingless Bee Honey',
        tagline: "Nature's Rare Sweetness",
        description: 'Sourced from the untouched forests of Kerala, this rare honey is produced by stingless bees. Rich in antioxidants and enzymes.',
        image: '/brands/kerazone/honey.jpg',
        specs: {
          origin: 'Kerala, India',
          packaging: '250g Glass Jar | 5kg Bulk Pail',
          certificate: 'Organic, FSSAI, Lab-Tested',
          moq: '50 units (retail) | 500kg (bulk)'
        },
        ctaText: 'Request Spec Sheet',
        accent: 'amber'
      },
      {
        id: 'kerazone-cardamom',
        badge: 'Export Grade',
        name: 'Kerala Green Cardamom',
        tagline: 'The Queen of Spices',
        description: 'Premium Alleppey Green Cardamom, hand-picked at peak maturity. Bold aroma and vibrant green pods.',
        image: '/brands/kerazone/cardamom.jpg',
        specs: {
          origin: 'Idukki, Kerala, India',
          grade: '8mm+ Bold Pods',
          packaging: '1kg Vacuum Pack | 25kg Carton',
          certificate: 'ISO 22000, HACCP, Spice Board Approved',
          moq: '100kg'
        },
        ctaText: 'Inquire for Bulk Pricing',
        accent: 'emerald'
      },
      {
        id: 'kerazone-vco',
        name: 'Virgin Coconut Oil (1L)',
        tagline: 'Pure Goodness in Every Drop.',
        description: 'Our extra virgin coconut oil is cold-pressed from the finest Kerala coconuts. Unrefined, unbleached, and non-deodorized.',
        image: '/brands/kerazone/oil.jpg',
        specs: {
          origin: 'Kerala, India',
          packaging: '1L Glass Bottle | 20L Bulk Drum',
          certificate: 'HACCP, GMP Certified',
          moq: '200 Litres'
        },
        ctaText: 'Get Quote',
        accent: 'forest'
      }
    ]
  },
  {
    id: 'fiori',
    category: 'Industrial Excellence',
    name: 'Fióri',
    tagline: 'Pure Fruit Solutions',
    description: 'High-grade fruit processing for industrial and culinary use. Our Fióri line ensures consistency, flavor, and purity for manufacturers who demand the best.',
    features: ['B2B & Industrial Scaling', '100% Preservative Free Options', 'Sterile Aseptic Packaging', 'Global Logistics Handling'],
    brandProfilePdf: '/HARVEN-Profil26b_compressed.pdf',
    introImage: '/brands/fiori/farm.png',
    secondaryImage: '/brands/fiori/processing.png',
    imagePosition: 'left',
    additionalSections: [
      {
        title: 'Source & Supply',
        items: ['Farm to Facility Integration']
      },
      {
        title: 'Purity & Yield',
        items: ['Maximum Brix Guaranteed']
      }
    ],
    products: [
      {
        id: 'fiori-mangozy',
        badge: 'Bestseller',
        name: 'Mangozy',
        tagline: 'Premium Alphonso Mango Pulp',
        description: '100% Premium Alphonso Mango Pulp. Unsweetened. Ideal for manufacturing & catering.',
        image: '/brands/fiori/mangozy.jpg',
        specs: {
          origin: 'India',
          brix: '16° - 18° Min',
          acidity: '0.5% - 0.7%',
          shelfLife: '24 Months',
          storage: 'Ambient Temp',
          packaging: '3.1 KG Bulk Format Can',
          certificate: 'Export Quality',
          moq: '1 Pallet'
        },
        ctaText: 'Partner with Fióri',
        accent: 'terracotta'
      },
      {
        id: 'fiori-guava-demo',
        badge: 'New',
        name: 'Guava Pulp (Demo)',
        tagline: 'Premium Pink Guava Extract',
        description: 'Demo product. High quality pink guava pulp processed under strict hygienic conditions. Ideal for beverages and confectioneries.',
        image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&q=80',
        specs: {
          origin: 'India',
          brix: '9° - 11° Min',
          acidity: '0.4% - 0.6%',
          shelfLife: '18 Months',
          storage: 'Ambient Temp',
          packaging: '3.1 KG Bulk Format Can',
          certificate: 'Export Quality',
          moq: '1 Pallet'
        },
        ctaText: 'Request Sample',
        accent: 'terracotta'
      }
    ]
  }
];
