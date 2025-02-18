export interface PostModel {
  id: number;
  username: string;
  name: string;
  address: string;
  phone: string;
  deletePost: (id: number) => void;
}

export interface PostAddModel {
  username: string;
  name: string;
  adress: string;
  phone: string;
}
