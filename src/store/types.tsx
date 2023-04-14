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

export interface Validation {
  name: string;
  contactNameErr: string;
  surname: string;
  contactSurnameErr: string;
  avatar: string;
  contactAvatarErr: string;
  disabled: boolean;
}
