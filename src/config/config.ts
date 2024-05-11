import { config } from 'dotenv';
import { join } from 'path';
import { z } from 'zod';

config({ path: join(process.cwd(), '.env') });

const envVarsSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'test']),
  PORT: z.string().default('3000'),
  BASE_URL: z.string().default('http://localhost:3000'),
  CLIENT_OUT_DIR: z.string().default('./public/build'),
  JS_REPORT_USERNAME: z.string(),
  JS_REPORT_PASSWORD: z.string(),
  JS_REPORT_PREFIX: z.string().default('/api/reporting'),
  JS_REPORT_FS: z.string().default('/store/data'),
  JS_REPORT_COOKIE_SESH_SECRET: z.string(),
  JS_REPORT_API_BASE_URL: z.string(),
  JS_REPORT_API_USERNAME: z.string(),
  JS_REPORT_API_PASSWORD: z.string()
});

const envVars = envVarsSchema.parse(process.env);

const configObject = {
  env: envVars.NODE_ENV,
  port: parseInt(envVars.PORT, 10),
  baseUrl: envVars.BASE_URL,
  clientOutDir: envVars.CLIENT_OUT_DIR,
  jsReportUsername: envVars.JS_REPORT_USERNAME,
  jsReportPassword: envVars.JS_REPORT_PASSWORD,
  jsReportPrefix: envVars.JS_REPORT_PREFIX,
  jsReportFs: envVars.JS_REPORT_FS,
  jsReportCookieSeshSecret: envVars.JS_REPORT_COOKIE_SESH_SECRET,
  jsReportCloudBaseUrl: envVars.JS_REPORT_API_BASE_URL,
  jsReportCloudUsername: envVars.JS_REPORT_API_USERNAME,
  jsReportCloudPassword: envVars.JS_REPORT_API_PASSWORD
};

export default configObject;
