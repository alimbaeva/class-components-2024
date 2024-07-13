import { ReactNode } from 'react';

export interface ResData {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface DataBodyI {
  count: number;
  next: string;
  previous: string;
  results: ResData[];
}

export interface ResultsProps {
  data: ResData[];
  handleCard: (data: ResData) => void;
  handleCloseDetailedCard: () => void;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

export interface CardProps {
  data: ResData;
  handleCard: (data: ResData) => void;
}

export interface CardPropsDetail {
  data: ResData;
  handleCloseDetailedCard: () => void;
}

export interface SearchProps {
  handleSearch: (value: string) => void;
}
