export type GeneratePayload = {
  key_code: string;
  items: RC1001_ITEMS[];
};

export type RC1001_DATA = {
  no_invoice: string;
  company_name: string;
  company_address: string;
  company_phone_number: string;
  items: RC1001_ITEMS[];
};

export type RC1001_ITEMS = {
  date: string;
  description: {
    client_name: string;
    service: string;
    pickup_location: string;
    destination_location: string;
  };
  price: number;
};
