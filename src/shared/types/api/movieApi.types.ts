export interface MovieType {
  id: string;
  video: string;
  treyler: string;
  name: string;
  descr: string;
  images: string[];
  frame_images: string[];
  movie_type: string;
  video_type: string;
  quality: string;
  format: number[];
  min_age: number;
  duration: number;
  language: string;
  status_type: string;
  is_slider: boolean;
  country_id: string;
  year_id: string;
  movie_id: any;
  video_id: string;
  created_at: string;
  updated_at: string;
  video_file: VideoFile;
  country: Country;
  year: Year;
  category: any[];
  sounder: Sounder[];
  movie_genre: MovieGenre[];
  parent_movie: any;
  childen_movie: any[];
}

export interface VideoFile {
  id: string;
  folder_name: string;
  used: boolean;
  file_name: string;
  default_format: any;
  file_size: any;
  format: number[];
  created_at: string;
  updated_at: string;
}

export interface Country {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Year {
  id: string;
  year: number;
  created_at: string;
  updated_at: string;
}

export interface Sounder {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface MovieGenre {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

// __________

export interface Category {
  id: string;
  name: string;
}

export interface ChildenMovie {
  id: string;
  video: string;
  name: string;
  movie_type: string;
}

export interface MovieInfo {
  id: string;
  video: string;
  name: string;
  movie_type: string;
  video_type: string;
  format: number[];
  movie_id: any;
}

export enum MovieStatusType {
  movie = 'movie',
  serial = 'serial',
  serial_part = 'serial_part',
}

export enum MoviePaymentStatusType {
  free = 'free',
  premium = 'premium',
}

export enum MovieQuality {
  hd_full = 'hd_full',
  hd_720 = 'hd_720',
  hd_420 = 'hd_420',
  hd_360 = 'hd_360',
  hd_244 = 'hd_244',
}

export interface PaymentOrderResponseType {
  success: boolean;
  message: string;
  link: string;
  order: Order;
}

export interface Order {
  id: string;
  tid: any;
  success: boolean;
  price: number;
  discount: number;
  user_id: string;
  plan_id: string;
  promo_id: any;
  plan: Plan;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  premium_date: number;
  is_active: boolean;
}
