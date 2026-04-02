export type MenuOption = {
  id: string;
  label: string;
  price: number;
};

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  basePrice?: number;
  optionGroups: {
    id: string;
    label: string;
    required?: boolean;
    options: MenuOption[];
  }[];
  categoryId: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  items: MenuItem[];
};

export type RestaurantInfo = {
  name: string;
  location: string;
  phone: string;
  email: string;
  promotions: { title: string; details: string[] }[];
};

export type NormalizedMenu = {
  restaurant: RestaurantInfo;
  categories: MenuCategory[];
};

export type CartItem = {
  cartId: string;
  itemId: string;
  itemName: string;
  categoryTitle: string;
  quantity: number;
  unitPrice: number;
  selectedOptions: { groupLabel: string; optionLabel: string }[];
  notes: string;
};
