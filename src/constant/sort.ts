export const sortOptions = [
  {
    label: 'Default sorting',
    value: 'menu_order',
  },
  {
    label: 'Sort by popularity',
    value: 'popularity',
  },
  {
    label: 'Sort by average rating',
    value: 'rating',
  },
  {
    label: 'Sort by latest',
    value: 'date',
  },
  {
    label: 'Sort by price: low to high',
    value: 'price',
  },
  {
    label: 'Sort by price: high to low',
    value: 'price-desc',
  },
];

export function sortBy(value: string) {
  switch (value) {
    case 'popularity':
      return {
        field: 'TOTAL_SALES',
        order: 'DESC',
      };
    case 'rating':
      return {
        field: 'RATING',
        order: 'DESC',
      };
    case 'date':
      return {
        field: 'DATE',
        order: 'ASC',
      };
    case 'price':
      return {
        field: 'PRICE',
        order: 'ASC',
      };
    case 'price-desc':
      return {
        field: 'PRICE',
        order: 'DESC',
      };
    default:
      return {
        field: 'MENU_ORDER',
        order: 'DESC',
      };
  }
}
