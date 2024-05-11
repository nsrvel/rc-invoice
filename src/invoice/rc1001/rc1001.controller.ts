import httpStatus from 'http-status';
import ApiError from '../../models/errors/api-error';
import catchAsync from '../../utils/catch-async';
import reportService from './rc1001.service';
import { GeneratePayload } from './rc1001.model';

const generateRC1001 = catchAsync(async (req, res) => {
  const body = req.body as GeneratePayload;
  const report = await reportService(body);

  if (!report) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Report not found');
  }

  // const buffer = Buffer.from(report.content);

  // if (!buffer) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Report not found');
  // }
  // res.setHeader('Content-Length', buffer.length);
  // res.send(buffer);

  // Set response headers for PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=DNT-INVOICE.pdf`);

  // Send PDF as response
  report.pipe(res);
});

export default generateRC1001;
