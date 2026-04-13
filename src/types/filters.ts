type Filters = {
  page: number;
  page_size: number;
  start_time: string;
  role_id: string;
  status: string;
  name: string;
  full_name: string;
  business_type: string;
  outlet_status: string;
  position_id: string;
  zip: string;
  sort: string;
};

export type GlobalFilters = Partial<Filters>;
