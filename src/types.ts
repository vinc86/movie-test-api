export interface RegisterResponse extends UserInfo {}

export interface LoginResponse {
  id: string;
  token: string;
}

export interface UserInfo {
  id: string;
  username: string;
}

export interface Context {
  userInfo: UserInfo;
}



export interface MovieInfo {
  id: string;
  name: string;
  releaseDate: number;
  duration: number;
  actors: [string];
  averageRating: number;
  imageURL: string;
  reactions: [String];
}