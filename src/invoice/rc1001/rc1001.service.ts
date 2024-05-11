// import { jsReportClient as client } from '../../exts/js-report';
import { GeneratePayload, RC1001_DATA } from './rc1001.model';
import client from '../../jsreport';

const generateRC1001 = async (payload: GeneratePayload) => {
  // Format & Filter Data
  const data: RC1001_DATA = {
    no_invoice: generateInvoice(),
    company_name: 'DEWA NASIB TRANS',
    company_address: 'Jl. Pekaja Tugu, Kalibagor, Banyumas',
    company_phone_number: '+62-823-0121-2175',
    items: payload.items
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

export default generateRC1001;
