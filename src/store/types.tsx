export interface IContact {
  id: string;
  name: string;
  surname: string;
  avatar: string;
  userId?: number;
}

export interface Auth {
  userId: number | null;
  token: string | null;
}
