export const categories = [
  { id: 'all', name: 'All Products', icon: 'Sparkles' },
  { id: 'dairy', name: 'Dairy & Breakfast', icon: 'Milk' },
  { id: 'vegetables', name: 'Vegetables & Fruits', icon: 'Apple' },
  { id: 'munchies', name: 'Munchies', icon: 'Cookie' },
  { id: 'drinks', name: 'Cold Drinks & Juices', icon: 'CupSoda' },
  { id: 'sweets', name: 'Sweet Tooth', icon: 'CakeSlice' },
  { id: 'bakery', name: 'Bakery & Biscuits', icon: 'Croissant' }
];

export const products = [
  // Dairy & Breakfast
  {
    id: 'd1',
    name: 'Amul Taaza Fresh Toned Milk',
    category: 'dairy',
    price: 28,
    originalPrice: 30,
    weight: '500 ml',
    discount: '7% OFF',
    time: '8 MINS',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=60',
    description: 'Fresh toned milk processed using Ultra High Temperature (UHT) technology, ensuring long shelf life and nutrition.',
    tags: ['milk', 'taaza', 'amul', 'doodh', 'dairy', 'breakfast'],
    details: {
      'Key Feature': 'Homogenized & Pasteurized',
      'Shelf Life': '180 days (unopened)',
      'Manufacturer': 'Amul India Co-op Ltd',
      'Net Weight': '500 ml'
    }
  },
  {
    id: 'd2',
    name: 'Amul Butter',
    category: 'dairy',
    price: 56,
    originalPrice: 58,
    weight: '100 g',
    discount: '3% OFF',
    time: '9 MINS',
    image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format&fit=crop&q=60',
    description: 'Deliciously salted, creamy butter made from pure milk fat. Ideal for baking, spreading, and cooking.',
    tags: ['butter', 'amul', 'salted', 'makhan', 'dairy', 'breakfast'],
    details: {
      'Key Feature': 'Creamy & Spreadable',
      'Shelf Life': '12 months',
      'Manufacturer': 'Amul India Co-op Ltd',
      'Net Weight': '100 g'
    }
  },
  {
    id: 'd3',
    name: 'Amul Masti Spiced Buttermilk',
    category: 'dairy',
    price: 15,
    originalPrice: 15,
    weight: '200 ml',
    discount: '0% OFF',
    time: '7 MINS',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&auto=format&fit=crop&q=60',
    description: 'Refreshing spiced buttermilk flavored with natural herbs, perfect for hot summer days.',
    tags: ['buttermilk', 'masti', 'chaas', 'drink', 'beverage', 'dairy'],
    details: {
      'Key Feature': 'Spiced & Refreshing',
      'Shelf Life': '6 months',
      'Manufacturer': 'Amul India Co-op Ltd',
      'Net Weight': '200 ml'
    }
  },
  {
    id: 'd4',
    name: 'Mother Dairy Cheese Slices',
    category: 'dairy',
    price: 135,
    originalPrice: 150,
    weight: '200 g (10 slices)',
    discount: '10% OFF',
    time: '10 MINS',
    image: '/images/cheese_slices.png',
    description: 'Processed cheese slices with a rich, creamy flavor. Melts perfectly on burgers, toasts, and sandwiches.',
    tags: ['cheese', 'slices', 'cheeze', 'dairy'],
    details: {
      'Key Feature': 'Individually Wrapped Slices',
      'Shelf Life': '9 months',
      'Manufacturer': 'Mother Dairy Fruit & Vegetable Pvt Ltd',
      'Net Weight': '200 g'
    }
  },
  {
    id: 'd5',
    name: 'Hen Fruits Fresh Eggs (Brown)',
    category: 'dairy',
    price: 79,
    originalPrice: 90,
    weight: '6 pieces',
    discount: '12% OFF',
    time: '8 MINS',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=500&auto=format&fit=crop&q=60',
    description: 'Rich in protein, farm-fresh high quality brown eggs with deep yellow yolks.',
    tags: ['eggs', 'egg', 'anda', 'protein', 'breakfast', 'dairy'],
    details: {
      'Key Feature': 'Farm-Fresh & Cleaned',
      'Shelf Life': '21 days',
      'Manufacturer': 'Hen Fruits Pvt Ltd',
      'Net Weight': '6 Units'
    }
  },

  // Vegetables & Fruits
  {
    id: 'v1',
    name: 'Fresh Banana (Robusta)',
    category: 'vegetables',
    price: 49,
    originalPrice: 60,
    weight: '1 kg (approx 6-8 pcs)',
    discount: '18% OFF',
    time: '10 MINS',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&auto=format&fit=crop&q=60',
    description: 'Sweet and nutritious, freshly harvested bananas. Excellent source of potassium and energy.',
    tags: ['banana', 'bananas', 'kela', 'fruit', 'fruits', 'fresh'],
    details: {
      'Key Feature': 'Naturally Ripened',
      'Shelf Life': '3-4 days',
      'Origin': 'Karnataka, India',
      'Net Weight': '1 kg'
    }
  },
  {
    id: 'v2',
    name: 'Fresh Potato (Jyoti)',
    category: 'vegetables',
    price: 32,
    originalPrice: 40,
    weight: '1 kg',
    discount: '20% OFF',
    time: '9 MINS',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60',
    description: 'High-quality farm-fresh Jyoti potatoes, perfect for frying, baking, boiling, and mashing.',
    tags: ['potato', 'potatoes', 'aloo', 'vegetable', 'vegetables', 'fresh'],
    details: {
      'Key Feature': 'Handpicked Quality',
      'Shelf Life': '10 days',
      'Origin': 'Uttar Pradesh, India',
      'Net Weight': '1 kg'
    }
  },
  {
    id: 'v3',
    name: 'Hybrid Tomato (Red)',
    category: 'vegetables',
    price: 38,
    originalPrice: 50,
    weight: '500 g',
    discount: '24% OFF',
    time: '8 MINS',
    image: '/images/hybrid_tomato.png',
    description: 'Juicy, plump red tomatoes ideal for curries, salads, soups, and sauces.',
    tags: ['tomato', 'tomatoes', 'tamatar', 'vegetable', 'vegetables', 'fresh'],
    details: {
      'Key Feature': 'Farm-Fresh & Handpicked',
      'Shelf Life': '4-5 days',
      'Origin': 'Maharashtra, India',
      'Net Weight': '500 g'
    }
  },
  {
    id: 'v4',
    name: 'Fresh Onion (Pyaz)',
    category: 'vegetables',
    price: 45,
    originalPrice: 55,
    weight: '1 kg',
    discount: '18% OFF',
    time: '9 MINS',
    image: '/images/fresh_onion.png',
    description: 'Pungent and crisp red onions. Essential staple for almost all Indian dishes.',
    tags: ['onion', 'onions', 'pyaaz', 'vegetable', 'vegetables', 'fresh'],
    details: {
      'Key Feature': 'Dry & Well-Cured',
      'Shelf Life': '15 days',
      'Origin': 'Nashik, Maharashtra',
      'Net Weight': '1 kg'
    }
  },
  {
    id: 'v5',
    name: 'Shimla Apple (Royal Delicious)',
    category: 'vegetables',
    price: 180,
    originalPrice: 220,
    weight: '4 pieces (approx. 650g)',
    discount: '18% OFF',
    time: '12 MINS',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=60',
    description: 'Sweet, crisp, and ruby red apples directly sourced from the orchards of Shimla.',
    tags: ['apple', 'apples', 'seb', 'fruit', 'fruits', 'fresh'],
    details: {
      'Key Feature': 'Crispy & Juicy',
      'Shelf Life': '7 days',
      'Origin': 'Himachal Pradesh, India',
      'Net Weight': '4 Units'
    }
  },

  // Munchies
  {
    id: 'm1',
    name: 'Lays Potato Chips (Classic Salted)',
    category: 'munchies',
    price: 20,
    originalPrice: 20,
    weight: '50 g',
    discount: '0% OFF',
    time: '8 MINS',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=60',
    description: 'Crisp, light potato chips cooked in healthy edible vegetable oil, salted to perfection.',
    tags: ['lays', 'chips', 'potato chips', 'salty', 'munchies', 'snacks'],
    details: {
      'Key Feature': 'Crispy Classic Flavor',
      'Shelf Life': '4 months',
      'Manufacturer': 'PepsiCo India Holdings Pvt Ltd',
      'Net Weight': '50 g'
    }
  },
  {
    id: 'm2',
    name: 'Haldirams Bhujia Sev',
    category: 'munchies',
    price: 105,
    originalPrice: 115,
    weight: '350 g',
    discount: '8% OFF',
    time: '10 MINS',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&auto=format&fit=crop&q=60',
    description: 'Crispy, spicy moth bean and gram flour noodles flavored with mixed spices. The ultimate tea-time companion.',
    tags: ['bhujia', 'sev', 'namkeen', 'haldiram', 'munchies', 'snacks'],
    details: {
      'Key Feature': 'Spicy Indian Namkeen',
      'Shelf Life': '6 months',
      'Manufacturer': 'Haldiram Foods International Pvt Ltd',
      'Net Weight': '350 g'
    }
  },
  {
    id: 'm3',
    name: 'Kurkure Masala Munch',
    category: 'munchies',
    price: 20,
    originalPrice: 20,
    weight: '90 g',
    discount: '0% OFF',
    time: '9 MINS',
    image: '/images/kurkure_masala.png',
    description: 'Crunchy, spice-filled corn puffs flavored with classic Indian spices. A spicy delight.',
    tags: ['kurkure', 'masala', 'puffs', 'munchies', 'snacks'],
    details: {
      'Key Feature': '100% Vegetarian Puffs',
      'Shelf Life': '5 months',
      'Manufacturer': 'PepsiCo India Holdings Pvt Ltd',
      'Net Weight': '90 g'
    }
  },
  {
    id: 'm4',
    name: 'Act II Golden Sizzle Popcorn',
    category: 'munchies',
    price: 45,
    originalPrice: 50,
    weight: '150 g',
    discount: '10% OFF',
    time: '11 MINS',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60',
    description: 'Instant butter-flavored popcorn. Pop it in a pressure cooker or heavy-bottomed pan and enjoy hot.',
    tags: ['popcorn', 'act ii', 'butter popcorn', 'munchies', 'snacks'],
    details: {
      'Key Feature': '3-Minute Home Popcorn',
      'Shelf Life': '12 months',
      'Manufacturer': 'Agro Tech Foods Ltd',
      'Net Weight': '150 g'
    }
  },

  // Cold Drinks & Juices
  {
    id: 'c1',
    name: 'Coca-Cola Zero Sugar Can',
    category: 'drinks',
    price: 40,
    originalPrice: 40,
    weight: '330 ml',
    discount: '0% OFF',
    time: '8 MINS',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60',
    description: 'Enjoy the same refreshing taste of Coca-Cola with zero calories and zero sugar.',
    tags: ['coke', 'cola', 'coca-cola', 'cold drink', 'soft drink', 'soda', 'beverage'],
    details: {
      'Key Feature': 'Sugar-Free & Low Calorie',
      'Shelf Life': '6 months',
      'Manufacturer': 'Hindustan Coca-Cola Beverages Pvt Ltd',
      'Net Weight': '330 ml'
    }
  },
  {
    id: 'c2',
    name: 'Tropicana 100% Orange Juice',
    category: 'drinks',
    price: 110,
    originalPrice: 130,
    weight: '1 L',
    discount: '15% OFF',
    time: '10 MINS',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&auto=format&fit=crop&q=60',
    description: '100% pure squeezed orange juice with no added sugar or preservatives. Rich in Vitamin C.',
    tags: ['juice', 'orange', 'tropicana', 'cold drink', 'beverage'],
    details: {
      'Key Feature': 'No Added Sugar',
      'Shelf Life': '7 months',
      'Manufacturer': 'Varun Beverages Limited',
      'Net Weight': '1 L'
    }
  },
  {
    id: 'c3',
    name: 'Red Bull Energy Drink',
    category: 'drinks',
    price: 125,
    originalPrice: 125,
    weight: '250 ml',
    discount: '0% OFF',
    time: '9 MINS',
    image: '/images/red_bull_energy.png',
    description: 'Vitalizes body and mind. High caffeine content. Contains taurine and B-group vitamins.',
    tags: ['red bull', 'redbull', 'energy drink', 'caffeine', 'beverage'],
    details: {
      'Key Feature': 'Improves Performance & Focus',
      'Shelf Life': '24 months',
      'Manufacturer': 'Red Bull GmbH (Austria)',
      'Net Weight': '250 ml'
    }
  },
  {
    id: 'c4',
    name: 'Kinley Club Soda Extra Fizz',
    category: 'drinks',
    price: 20,
    originalPrice: 22,
    weight: '750 ml',
    discount: '9% OFF',
    time: '8 MINS',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&auto=format&fit=crop&q=60',
    description: 'Extra carbonated club soda, perfect for mixing drinks or enjoying with a squeeze of lime.',
    tags: ['soda', 'club soda', 'kinley', 'fizz', 'beverage'],
    details: {
      'Key Feature': 'Extra Carbonated',
      'Shelf Life': '4 months',
      'Manufacturer': 'Hindustan Coca-Cola Beverages Pvt Ltd',
      'Net Weight': '750 ml'
    }
  },

  // Sweet Tooth
  {
    id: 's1',
    name: 'Cadbury Dairy Milk Silk',
    category: 'sweets',
    price: 80,
    originalPrice: 85,
    weight: '60 g',
    discount: '6% OFF',
    time: '8 MINS',
    image: '/images/dairy_milk_silk.png',
    description: 'Rich, smooth and creamy chocolate bar that melts instantly in the mouth.',
    tags: ['chocolate', 'sweets', 'silk', 'cadbury', 'dairy milk'],
    details: {
      'Key Feature': '100% Sustainably Sourced Cocoa',
      'Shelf Life': '12 months',
      'Manufacturer': 'Mondelez India Foods Pvt Ltd',
      'Net Weight': '60 g'
    }
  },
  {
    id: 's2',
    name: 'Amul Vanilla Gold Ice Cream',
    category: 'sweets',
    price: 90,
    originalPrice: 100,
    weight: '500 ml tub',
    discount: '10% OFF',
    time: '12 MINS',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=60',
    description: 'Rich vanilla ice cream crafted with real milk fat and premium vanilla beans.',
    tags: ['ice cream', 'icecream', 'vanilla', 'amul', 'sweets'],
    details: {
      'Key Feature': 'Real Milk Ice Cream',
      'Shelf Life': '12 months',
      'Manufacturer': 'Amul India Co-op Ltd',
      'Net Weight': '500 ml'
    }
  },
  {
    id: 's3',
    name: 'Ferrero Rocher Chocolates',
    category: 'sweets',
    price: 399,
    originalPrice: 450,
    weight: '16 pieces (200g)',
    discount: '11% OFF',
    time: '10 MINS',
    image: '/images/ferrero_rocher.png',
    description: 'Crispy hazelnut milk chocolate candies. Whole hazelnut inside, surrounded by rich cream, crispy wafer, and milk chocolate.',
    tags: ['chocolate', 'ferrero', 'sweets', 'gift'],
    details: {
      'Key Feature': 'Premium Italian Chocolates',
      'Shelf Life': '9 months',
      'Manufacturer': 'Ferrero SpA',
      'Net Weight': '200 g'
    }
  },

  // Bakery & Biscuits
  {
    id: 'b1',
    name: 'Harvest Gold White Bread',
    category: 'bakery',
    price: 25,
    originalPrice: 25,
    weight: '400 g',
    discount: '0% OFF',
    time: '8 MINS',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=60',
    description: 'Soft, freshly baked white bread. Perfect for sandwiches and toasts.',
    tags: ['bread', 'white bread', 'harvest gold', 'breakfast', 'bakery'],
    details: {
      'Key Feature': 'Soft & Fresh',
      'Shelf Life': '5 days',
      'Manufacturer': 'Harvest Gold Foods Pvt Ltd',
      'Net Weight': '400 g'
    }
  },
  {
    id: 'b2',
    name: 'Britannia Good Day Butter Cookies',
    category: 'bakery',
    price: 20,
    originalPrice: 20,
    weight: '120 g',
    discount: '0% OFF',
    time: '8 MINS',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop&q=60',
    description: 'Rich, butter-baked cookies with a delightful smile. An all-time favorite cookie.',
    tags: ['cookies', 'biscuits', 'good day', 'britannia', 'bakery'],
    details: {
      'Key Feature': 'Smile Cookies with Butter',
      'Shelf Life': '6 months',
      'Manufacturer': 'Britannia Industries Ltd',
      'Net Weight': '120 g'
    }
  },
  {
    id: 'b3',
    name: 'Freshly Baked Butter Croissant',
    category: 'bakery',
    price: 85,
    originalPrice: 95,
    weight: '1 piece (80g)',
    discount: '10% OFF',
    time: '12 MINS',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=60',
    description: 'Golden, flaky, and buttery French croissant baked fresh daily by local bakers.',
    tags: ['croissant', 'butter croissant', 'bakery', 'bread'],
    details: {
      'Key Feature': '100% Pure Butter Flakiness',
      'Shelf Life': '2 days',
      'Manufacturer': 'Blinkit In-house Bakery',
      'Net Weight': '80 g'
    }
  },
  {
    id: 'b4',
    name: 'Chocolate Chip Muffins',
    category: 'bakery',
    price: 60,
    originalPrice: 70,
    weight: '2 pieces (120g)',
    discount: '14% OFF',
    time: '11 MINS',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop&q=60',
    description: 'Soft, sponge muffins studded with rich dark chocolate chips. A perfect sweet snack.',
    tags: ['muffins', 'muffin', 'chocolate muffin', 'bakery'],
    details: {
      'Key Feature': 'Eggless & Soft',
      'Shelf Life': '4 days',
      'Manufacturer': 'Blinkit In-house Bakery',
      'Net Weight': '120 g'
    }
  }
];
