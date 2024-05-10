export interface MovieType {
  id: string;
  video: any;
  treyler: string;
  name: string;
  descr: string;
  images: string[];
  frame_images: string[];
  movie_type: string;
  quality: string;
  min_age: number;
  duration: any;
  language: string;
  status_type: string;
  is_slider: boolean;
  country_id: string;
  year_id: string;
  movie_id: any;
  country: Country;
  year: Year;
  category: Category[];
  sounder: Sounder[];
  movie_genre: MovieGenre[];
  parent_movie: any;
  childen_movie: ChildenMovie[];
}

export interface Country {
  id: string;
  name: string;
}

export interface Year {
  id: string;
  year: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface Sounder {
  id: string;
  name: string;
}

export interface MovieGenre {
  id: string;
  name: string;
}

export interface ChildenMovie {
  id: string;
  video: string;
  name: string;
  movie_type: string;
}
