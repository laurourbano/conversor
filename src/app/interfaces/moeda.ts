import { MatSortable } from "@angular/material/sort";

export interface Moeda extends MatSortable {
  description: string;
  code: string;

  getSortData(): string;
};
