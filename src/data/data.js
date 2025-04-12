const products = [
  {
    id: '1',
    name: 'Special Tea',
    description: 'Special masala chai',
    image: require('../public/tea.png'),
    sizes: {
      S: 5, // Small size price
      M: 10, // Medium size price
      L: 15, // Large size price
    },
  },
  {
    id: '2',
    name: 'Premium Coffee',
    description: 'Premium Coffee for you',
    image: require('../public/coffee.png'),
    sizes: {
      S: 20, // Small size price
      M: 25, // Medium size price
      L: 30, // Large size price
    },
  },
];

export default products;
