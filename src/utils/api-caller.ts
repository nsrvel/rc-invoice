import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config/config';
import logger from './logger';

// Define a generic function for making API requests
export async function apiCall<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: any,
  axiosConfig?: AxiosRequestConfig
): Promise<AxiosResponse<T, any>> {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      baseURL: config.baseUrl,
      url,
      data,
      headers: {
        'Content-Type': 'application/json',
        ...axiosConfig?.headers
      },
      ...axiosConfig
    });

    // if (response.status !== 200) {
    //   throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'failed to request client data');
    // }

    return response;
  } catch (error) {
    // Handle error or throw it for the calling code to handle
    logger.info('api-caller');
    throw error;
  }
}
