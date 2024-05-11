import CryptoJs from 'crypto-js';

export function btoa(value: string) {
  return CryptoJs.enc.Base64.stringify(CryptoJs.enc.Utf8.parse(value));
}
