import dayjs from 'dayjs';

export interface IMarketing {
  id?: string;
  campaign_name?: string;
  start_date?: dayjs.Dayjs;
  end_date?: dayjs.Dayjs;
}

export const defaultValue: Readonly<IMarketing> = {};
