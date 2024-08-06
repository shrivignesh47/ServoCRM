import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { StatusTicket } from 'app/shared/model/enumerations/status-ticket.model';
import { channel } from 'app/shared/model/enumerations/channel.model';
import { classification } from 'app/shared/model/enumerations/classification.model';

export interface ITicket {
  id?: string;
  contact_name?: string;
  account_name?: string;
  email?: string;
  phone?: number;
  subject?: string;
  description?: string;
  status?: keyof typeof StatusTicket;
  product_name?: string | null;
  due_date?: dayjs.Dayjs;
  language?: string;
  channel?: keyof typeof channel;
  classifications?: keyof typeof classification;
  attachmentsContentType?: string | null;
  attachments?: string | null;
  user?: IUser;
}

export const defaultValue: Readonly<ITicket> = {};
