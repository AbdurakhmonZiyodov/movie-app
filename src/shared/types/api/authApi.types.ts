export type Tokens = {
  access_token: string;
  refresh_token: string;
};

export interface LoginResponse {
  success: boolean;
  message: string;
  data: Tokens & {
    user: {
      is_success: boolean;
    };
  };
}

export interface ProfileInfoResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    email: string;
    name: string;
    status_type: string;
    is_success: boolean;
    premium_end_date: string;
    is_block: boolean;
    image: string | null;
  };
}
