export const menuSource = {
  restaurant: 'Pizza Hut',
  location: "Quartier AL Quods - Projet Les Jardins de l'Orient - Oujda",
  contact: {
    phone: '05 36 50 72 72',
    email: 'reclamations.ph@mawarid.co.ma'
  },
  promotions: {
    pair_deal_2_en_1: {
      '2_pizzas_small': '95 DH',
      '2_pizzas_medium': '170 DH',
      '2_pizzas_large': '230 DH',
      includes: '1 Potatoes + 1 Boisson 33cl offerts'
    }
  },
  crust_options: [
    'Traditionnelle',
    'Pan Pizza',
    'Cheesy Crust (Supplement: 10 DH Individual / 15 DH Double or Triple)'
  ],
  pizzas: {
    categories: [
      {
        name: 'Margherita',
        prices: { individual: 45, double: 80, triple: 100 },
        variants: ['Mozzarella et sauce tomate aux herbes']
      },
      {
        name: 'Inédites',
        prices: { individual: 60, double: 115, triple: 145 },
        variants: [
          {
            name: 'Marina',
            ingredients:
              'Thon, olives noires, dés de tomate, oignons, mozzarella et sauce tomate aux herbes'
          },
          {
            name: 'Forestière',
            ingredients:
              'Viande hachée (boeuf), champignons, tomates fraîches, mozzarella et sauce tomate aux herbes'
          },
          {
            name: 'Beefy',
            ingredients:
              'Viande hachée (boeuf), oignons, poivrons verts, mozzarella et sauce tomate aux herbes'
          },
          {
            name: 'Spicy Hot',
            ingredients:
              'Viande hachée (boeuf ou poulet), piments verts, tomates fraîches, oignons, mozzarella'
          },
          {
            name: 'Poulet Sauce BBQ',
            ingredients: 'Poulet grillé et sauce barbecue, oignons, poivrons verts à mozzarella'
          },
          {
            name: 'Végétarienne',
            ingredients:
              'Champignons, poivrons verts, oignons, tomates fraîches, olives noires, mozzarella et sauce tomate aux herbes'
          }
        ]
      },
      {
        name: 'Spéciales',
        prices: { individual: 65, double: 125, triple: 155 },
        variants: [
          {
            name: 'Poulet Sauce Ranch',
            ingredients:
              'Poulet grillé, champignons, poivrons verts, oignons, mozzarella et sauce ranch'
          },
          {
            name: 'Suprême',
            ingredients:
              'Viande hachée (boeuf), pepperoni (boeuf), champignons, poivrons verts, oignons, mozzarella et sauce tomate aux herbes'
          },
          {
            name: 'Pepperoni Lovers',
            ingredients: 'Extra portion de pepperoni, mozzarella et sauce tomate aux herbes'
          }
        ]
      },
      {
        name: 'Gourmandes',
        prices: { individual: 70, double: 135, triple: 170 },
        variants: [
          {
            name: 'Pêcheur',
            ingredients:
              'Crevettes, calamars, origan, tomates fraîches, olives noires, mozzarella et sauce tomate aux herbes'
          },
          {
            name: 'Super Suprême',
            ingredients:
              'Viande hachée (boeuf), double portion de pepperoni (boeuf), champignons, poivrons verts, olives noires, oignons, mozzarella et sauce tomate aux herbes'
          },
          {
            name: 'Fruits de Mer - Sauce Alfredo',
            ingredients: 'Crevettes et calamars, sauce Alfredo, oignons, citron et mozzarella'
          }
        ]
      }
    ]
  },
  other_specialties: {
    calzones: {
      price: '48 DH',
      options: ['Beef Pepperoni', 'Cheese', 'Poulet BBQ', 'Suprême']
    },
    sandwiches: {
      price: '50 DH',
      options: ['Thon', 'Pepperoni Lovers', 'Poulet', 'Super Suprême', 'Super Beef']
    },
    pates_baked: {
      price: '55 DH',
      options: [
        'Penne poulet crème tomate',
        'Penne fruits de mer sauce alfredo',
        'Penne poulet alfredo'
      ]
    }
  },
  sides_suggestions_accompagnement: [
    { item: 'Potatoes', price: '19 DH' },
    { item: "Pain à l'Ail Fromage", price: '23 DH', pepperoni_option: '27 DH' },
    { item: 'Pepperoni Breadsticks', price: '39 DH' },
    { item: 'Cheezy Pops', sizes: [{ pcs: 12, price: '35 DH' }, { pcs: 24, price: '49 DH' }] },
    {
      item: 'Nuggets',
      sizes: [
        { pcs: 6, price: '34 DH' },
        { pcs: 9, price: '44 DH' },
        { pcs: 15, price: '65 DH' }
      ]
    },
    {
      item: 'Chicken Wings',
      sizes: [
        { pcs: 4, price: '38 DH' },
        { pcs: 6, price: '48 DH' },
        { pcs: 10, price: '68 DH' }
      ]
    },
    {
      item: 'Trio Assortiment',
      price: '60 DH',
      description: '4 PCS Breadsticks + Potatoes + 4 PCS de chicken wings'
    }
  ],
  desserts_glaces: {
    price_per_pot_125ml: '29 DH',
    flavors: ['Chocolat', 'Cookie-vanille', 'Yaourt fruit des bois', 'Sorbet fraise', 'Sorbet mangue']
  },
  beverages_soda: {
    options: ['Pepsi', 'Diet Pepsi', 'Seven Up', 'Mirinda'],
    sizes: [
      { volume: '33cl', price: '13 DH' },
      { volume: '1L', price: '15 DH' },
      { volume: '1.5L', price: '17 DH' }
    ]
  }
} as const;
