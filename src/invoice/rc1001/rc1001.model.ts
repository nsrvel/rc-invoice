export type GeneratePayload = {
  client_name: string;
  items: RC1001_PAYLOAD_ITEMS[];
};

export type RC1001_PAYLOAD_ITEMS = {
  departure_date: string;
  return_date: string;
  description: {
    service: string;
    car: string;
    pickup_location: string;
    destination_location: string;
    adultPassengerCount: number;
    infantPassengerCount: number;
  };
  is_round_trip: boolean;
  price: number;
};

export type RC1001_DATA = {
  no_invoice: string;
  company_name: string;
  company_address: string;
  company_phone_number: string;
  items: RC1001_DATA_ITEMS[];
};

export type RC1001_DATA_ITEMS = {
  date: string;
  description: {
    client_name: string;
    service: string;
    car: string;
    pickup_location: string;
    destination_location: string;
    passenger: string;
  };
  price: number;
};
