export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
  user?: {
    id: string;
    username: string;
    name: string;
  };
  error?: string;
}


export interface RegisterRequest {
  name: string;           // display name
  username: string;       // @handle
  email: string;
  password: string;
  birthdate?: string;     // optional — many platforms ask for age verification
}

export interface RegisterResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    username: string;
    name: string;
  };
  error?: string;
}