export interface User {
    name: string;
    surname: string;
    credentials: {
      username: string;
      passphrase: string;
    };
    active: boolean;
    created: string;
    _comment?: string;
  }

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  status: string;
  date_created: string;
}

