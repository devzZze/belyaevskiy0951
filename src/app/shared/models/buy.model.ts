export interface Buy {
  name: string;
  count: number;
  status: number;
  id?: number;
}
export enum BuyStatus {
  bought,
  not_bought,
}

