import dayjs from 'dayjs';

export interface IEvent {
  id?: string;
  event_name?: string;
  event_date?: dayjs.Dayjs;
  registrations?: number | null;
}

export const defaultValue: Readonly<IEvent> = {};
