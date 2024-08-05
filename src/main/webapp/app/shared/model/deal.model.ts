import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IAccounts } from 'app/shared/model/accounts.model';
import { IContacts } from 'app/shared/model/contacts.model';
import { ILead } from 'app/shared/model/lead.model';
import { Stage } from 'app/shared/model/enumerations/stage.model';
import { Type } from 'app/shared/model/enumerations/type.model';

export interface IDeal {
  id?: string;
  amount?: number;
  deal_name?: string;
  closing_date?: dayjs.Dayjs;
  stage?: keyof typeof Stage;
  type?: keyof typeof Type;
  probability_Percentage?: number | null;
  compaign_Source?: string | null;
  description?: string;
  user?: IUser;
  accounts?: IAccounts;
  contacts?: IContacts;
  lead?: ILead | null;
}

export const defaultValue: Readonly<IDeal> = {};
