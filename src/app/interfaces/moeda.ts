export interface Moeda {
  name(name: any, name1: any, isAsc: boolean): number;
  calories(calories: any, calories1: any, isAsc: boolean): number;
  fat(fat: any, fat1: any, isAsc: boolean): number;
  carbs(carbs: any, carbs1: any, isAsc: boolean): number;
  protein(protein: any, protein1: any, isAsc: boolean): number;
  description: string,
  code: string
}
