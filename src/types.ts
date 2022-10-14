export type TItem = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  dragId?: string;
  index?: number;
  count?: number;
};

export type TMessageOrder = {
  ingredients: string[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name?: string;
};

export type TMessage = {
  success: boolean;
  orders: TMessageOrder[];
  total: number;
  totalToday: number;
};

export interface SyntheticEvent {
  preventDefault(): void;
  stopPropagation(): void;
  key?: string;
  target?: EventTarget;
}

export interface CustomResponse {
  email?: string;
  password?: string;
  name?: string;
  message?: string;
  success?: boolean;
  data?: TItem[];
  accessToken: string;
  refreshToken: string;
  user: { email: string; name: string };
  order: { number: number };
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly trailer: Promise<Headers>;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
  json(): any;
}
