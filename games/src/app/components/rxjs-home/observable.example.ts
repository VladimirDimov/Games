import { of } from 'rxjs';

export const numbers$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
export const letters$ = of('a', 'b', 'c', 'd', 'e');

export const categories$ = of([
  'Phones',
  'Laptops',
  'Books',
  'Kitchen',
  'Garden',
]);
