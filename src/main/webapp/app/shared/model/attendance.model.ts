import dayjs from 'dayjs';
import { IEvent } from 'app/shared/model/event.model';

export interface IAttendance {
  id?: string;
  user?: string;
  timestamp?: dayjs.Dayjs;
  event?: IEvent;
}

export const defaultValue: Readonly<IAttendance> = {};
