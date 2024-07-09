import { ReactNode } from 'react';

export interface DataBodyI {
  pageNumber: number;
  pageSize: number;
  name: string;
  earthAnimal: boolean;
}

export interface RequestI {
  endPoint: string;
  body: DataBodyI;
}

export interface SearchResponseI {
  uid: string;
  name: string;
  earthAnimal: boolean;
  earthInsect: boolean;
  avian: boolean;
  canine: boolean;
  feline: boolean;
}

export interface StateI {
  data: SearchResponseI[];
  inputValue: string;
  loading: boolean;
  error: string | null;
  isError: boolean;
}

export interface ResultsProps {
  data: SearchResponseI[];
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}
