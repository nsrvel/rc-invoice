// import { jsReportClient as client } from '../../exts/js-report';
import { GeneratePayload, RC1001_DATA, RC1001_DATA_ITEMS } from './rc1001.model';
import client from '../../jsreport';

const generateRC1001 = async (payload: GeneratePayload) => {
  console.log(payload.client_name);

  // Format & Filter Data
  const items: RC1001_DATA_ITEMS[] = payload.items.map((obj) => ({
    date: getCustomDate(obj.departure_date, obj.return_date, obj.is_round_trip),
    description: {
      client_name: payload.client_name,
      service: getServiceName(obj.description.service, obj.is_round_trip),
      car: obj.description.car,
      pickup_location: obj.description.pickup_location,
      destination_location: obj.description.destination_location,
      passenger: getPassengerText(
        obj.description.adultPassengerCount,
        obj.description.infantPassengerCount
      )
    },
    price: obj.price
  }));

  const data: RC1001_DATA = {
    no_invoice: generateInvoice(),
    company_name: 'DEWA NASIB TRANS',
    company_address: 'Jl. Pekaja Tugu, Kalibagor, Banyumas',
    company_phone_number: '+62-823-0121-2175',
    items: items
  };

  // Generate PDF File
  const pdf = await client.render({
    template: {
      name: 'rc1001-main',
      engine: 'handlebars',
      recipe: 'chrome-pdf'
    },
    data: data
  });
  return pdf;
};

function generateInvoice() {
  const date = new Date();
  const year = date.getFullYear();
  const ticks = date.getTime();
  const code = generateCodeFromTicks(ticks);
  return `DNT-${year}-${code}`;
}

function generateCodeFromTicks(ticks: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = characters.length;
  let code = '';
  for (let i = 0; i < 6; i++) {
    const index = (ticks + i) % length;
    code += characters.charAt(index);
  }
  return code;
}

function customFormatDate(inputDate: string): string {
  const monthsShort = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agu',
    'Sep',
    'Okt',
    'Nov',
    'Des'
  ];
  const [day, monthIndex, year] = inputDate.split('-');
  const monthShort = monthsShort[parseInt(monthIndex) - 1];
  const shortYear = year.substr(2);
  return `${day} ${monthShort} ${shortYear}`;
}

function getCustomDate(departureDate: string, returnDate: string, isRoundTrip: boolean): string {
  return isRoundTrip
    ? `${customFormatDate(departureDate)} - ${customFormatDate(returnDate)}`
    : customFormatDate(departureDate);
}

function getServiceName(serviceName: string, isRoundTrip: boolean): string {
  return isRoundTrip ? `${serviceName} (Pulang-Pergi)` : serviceName;
}

function getPassengerText(adultPassengerCount: number, infantPassengerCount: number): string {
  return (
    (adultPassengerCount ? `Dewasa ${adultPassengerCount}` : '') +
    (infantPassengerCount ? `, Bayi ${infantPassengerCount}` : '')
  );
}

export default generateRC1001;
