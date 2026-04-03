import { menuSource } from '@/data/menu-source';
import { MenuCategory, MenuItem, NormalizedMenu } from './types';

const parseDH = (value: string): number => Number(value.replace('DH', '').trim());

const slug = (input: string) =>
  input
    .normalize('NFD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');

const makeOption = (label: string, price: number, idPrefix: string) => ({
  id: `${idPrefix}-${slug(label)}`,
  label,
  price
});

const pizzaItems: MenuItem[] = menuSource.pizzas.categories.flatMap((cat) => {
  const variants = cat.variants.map((variant) =>
    typeof variant === 'string' ? { name: cat.name, ingredients: variant } : variant
  );

  return variants.map((variant) => ({
    id: `pizza-${slug(cat.name)}-${slug(variant.name)}`,
    name: variant.name,
    description: variant.ingredients,
    basePrice: cat.prices.individual,
    categoryId: 'pizzas',
    optionGroups: [
      {
        id: 'size',
        label: 'Size',
        required: true,
        options: [
          makeOption('Individual', cat.prices.individual, 'size'),
          makeOption('Double', cat.prices.double, 'size'),
          makeOption('Triple', cat.prices.triple, 'size')
        ]
      },
      {
        id: 'crust',
        label: 'Crust',
        required: true,
        options: menuSource.crust_options.map((option) => {
          const isCheesy = option.includes('Cheesy');
          const cleanLabel = isCheesy ? 'Cheesy Crust' : option;
          return makeOption(cleanLabel, isCheesy ? 0 : 0, 'crust');
        })
      }
    ]
  }));
});

const specialties: MenuItem[] = Object.entries(menuSource.other_specialties).flatMap(
  ([key, specialty]) =>
    specialty.options.map((option) => ({
      id: `specialty-${slug(key)}-${slug(option)}`,
      name: option,
      description: key.replace('_', ' '),
      basePrice: parseDH(specialty.price),
      categoryId: 'specialties',
      optionGroups: []
    }))
);

const sides: MenuItem[] = menuSource.sides_suggestions_accompagnement.map((side) => {
  const basePrice = 'price' in side && side.price ? parseDH(side.price) : undefined;
  const sizeOptions = 'sizes' in side && side.sizes ? side.sizes : undefined;
  const pepperoniOption = 'pepperoni_option' in side ? side.pepperoni_option : undefined;

  const optionGroups = [] as MenuItem['optionGroups'];

  if (sizeOptions) {
    optionGroups.push({
      id: 'portion',
      label: 'Portion',
      required: true,
      options: sizeOptions.map((size) => makeOption(`${size.pcs} pcs`, parseDH(size.price), 'portion'))
    });
  }

  if (pepperoniOption) {
    optionGroups.push({
      id: 'style',
      label: 'Style',
      required: true,
      options: [
        makeOption('Regular', basePrice ?? 0, 'style'),
        makeOption('Pepperoni', parseDH(pepperoniOption), 'style')
      ]
    });
  }

  return {
    id: `side-${slug(side.item)}`,
    name: side.item,
    description: 'description' in side ? side.description : undefined,
    basePrice,
    categoryId: 'sides',
    optionGroups
  };
});

const desserts: MenuItem[] = menuSource.desserts_glaces.flavors.map((flavor) => ({
  id: `dessert-${slug(flavor)}`,
  name: flavor,
  description: 'Glace 125ml',
  basePrice: parseDH(menuSource.desserts_glaces.price_per_pot_125ml),
  categoryId: 'desserts',
  optionGroups: []
}));

const beverages: MenuItem[] = menuSource.beverages_soda.options.map((drink) => ({
  id: `drink-${slug(drink)}`,
  name: drink,
  categoryId: 'beverages',
  optionGroups: [
    {
      id: 'volume',
      label: 'Size',
      required: true,
      options: menuSource.beverages_soda.sizes.map((size) =>
        makeOption(size.volume, parseDH(size.price), 'volume')
      )
    }
  ]
}));

const categories: MenuCategory[] = [
  { id: 'pizzas', title: 'Pizzas', items: pizzaItems },
  { id: 'specialties', title: 'Other Specialties', items: specialties },
  { id: 'sides', title: 'Sides & Suggestions', items: sides },
  { id: 'desserts', title: 'Desserts & Ice Cream', items: desserts },
  { id: 'beverages', title: 'Beverages', items: beverages }
];

export const normalizedMenu: NormalizedMenu = {
  restaurant: {
    name: menuSource.restaurant,
    location: menuSource.location,
    phone: menuSource.contact.phone,
    email: menuSource.contact.email,
    promotions: [
      {
        title: 'Pair Deal 2 en 1',
        details: [
          `2 pizzas small: ${menuSource.promotions.pair_deal_2_en_1['2_pizzas_small']}`,
          `2 pizzas medium: ${menuSource.promotions.pair_deal_2_en_1['2_pizzas_medium']}`,
          `2 pizzas large: ${menuSource.promotions.pair_deal_2_en_1['2_pizzas_large']}`,
          menuSource.promotions.pair_deal_2_en_1.includes
        ]
      }
    ]
  },
  categories
};
