import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';

export interface IWhatsappmarketing {
  id?: string;
  name?: string;
  status?: string;
  created_On?: dayjs.Dayjs;
  created_by?: string | null;
  recipents?: number | null;
  report?: string | null;
  action?: string | null;
  user?: IUser;
}

export const defaultValue: Readonly<IWhatsappmarketing> = {};
