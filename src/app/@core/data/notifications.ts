export interface AppNotification {
  id: string;
  title: string;
  message: string;
  userId: string;
  timestamp: number;
  payload: AppNotificationPayload
  view?: boolean;
}

export interface AppNotificationPayload {
  type: AppNotificaionType;
  route?: string;
  actorId?: string
}

export enum AppNotificaionType {
  BID = 'bid',
  ORDER = 'order',
  REQUEST = 'request'
}
