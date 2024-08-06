import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { location } from 'app/shared/model/enumerations/location.model';

export interface IMeetings {
  id?: string;
  title?: string;
  location?: keyof typeof location;
  location_Offline_Detail?: string | null;
  from?: dayjs.Dayjs;
  to?: dayjs.Dayjs;
  user?: IUser;
}

export const defaultValue: Readonly<IMeetings> = {};
