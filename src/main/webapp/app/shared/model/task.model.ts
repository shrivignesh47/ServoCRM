import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { priority } from 'app/shared/model/enumerations/priority.model';
import { reminder } from 'app/shared/model/enumerations/reminder.model';

export interface ITask {
  id?: string;
  subject?: string;
  due_date?: dayjs.Dayjs | null;
  priority?: keyof typeof priority;
  description?: string;
  reminder?: keyof typeof reminder;
  user?: IUser | null;
}

export const defaultValue: Readonly<ITask> = {};
