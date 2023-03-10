export interface IContact {
  id: string;
  name: string;
  surname: string;
  userId?: number;
}

export interface Auth {
  userId: number | null;
  token: string | null;
}
