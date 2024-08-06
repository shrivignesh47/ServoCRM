import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { product_cat } from 'app/shared/model/enumerations/product-cat.model';
import { h } from 'app/shared/model/enumerations/h.model';

export interface IProduct {
  id?: string;
  product_name?: string;
  product_code?: number | null;
  product_category?: keyof typeof product_cat;
  manufacture?: string;
  sales_start_date?: dayjs.Dayjs;
  sales_end_date?: keyof typeof h | null;
  sales_Ending_date?: dayjs.Dayjs;
  support_start_date?: dayjs.Dayjs;
  support_end_date?: dayjs.Dayjs;
  unit_price?: number | null;
  commission_rate?: number | null;
  tax?: string | null;
  description?: string;
  user?: IUser;
}

export const defaultValue: Readonly<IProduct> = {};
