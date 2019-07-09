export interface INotification {

  id: number;
  type: string;
  message: string;
  acknowledged: boolean;
  hidden: boolean;
  createdAt: number;

}
