export type SelectOption = {
  value: string;
  label: string;
  data?: {
    image?: string;
    phone?: string;
    contact_type?: number;
    email?: string;
  };
  unavailable?: boolean;
};

export type GroupedOption = {
  label: string;
  options: SelectOption[];
};

export type CommonGroupOption<T> = {
  title: string;
  data: T[];
};
