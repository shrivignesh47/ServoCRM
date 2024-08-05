import { IUser } from 'app/shared/model/user.model';
import { rating } from 'app/shared/model/enumerations/rating.model';
import { ownership } from 'app/shared/model/enumerations/ownership.model';
import { acc_type } from 'app/shared/model/enumerations/acc-type.model';

export interface IAccounts {
  id?: string;
  account_owner?: string;
  rating?: keyof typeof rating;
  phone?: number;
  account_site?: string;
  fax?: string | null;
  website?: string;
  account_number?: number;
  ticket_Symbol?: string | null;
  ownership?: keyof typeof ownership;
  billing_street?: string;
  billing_city?: string;
  billing_state?: string;
  billing_code?: string;
  billing_country?: string;
  shipping_street?: string;
  shipping_city?: string | null;
  shipping_state?: string | null;
  shipping_code?: string | null;
  shipping_country?: string | null;
  description?: string;
  employees?: number;
  sic_code?: number | null;
  account_type?: keyof typeof acc_type;
  user?: IUser;
}

export const defaultValue: Readonly<IAccounts> = {};
