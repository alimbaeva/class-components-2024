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
  loading: boolean;
  error: string | null;
}
