// import { z } from 'zod';

// // 05-2001
// const regexBLTH = /^(0[1-9]|1[0-2])-(19|20)\d{2}$/;
// // A06

// const generateMISR1020 = z.object({
//   body: z.object({
//     report_period: z
//       .string()
//       .min(1, { message: 'report period required' })
//       .refine((value) => regexBLTH.test(value), {
//         message: 'invalid period format'
//       })
//   })
// });

// export default generateMISR1020;
