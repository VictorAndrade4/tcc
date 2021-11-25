export interface State {
  initials: string;
  fullname: string;
}

export interface FuzzyInputModel {
  city: string;
  state: string;
  selectedAreas: string[];
}

export interface MobileOperatorResult {
  name: string;
  rating: number;
  position: number;
}
