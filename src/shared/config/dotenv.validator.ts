import * as Dotenv from 'dotenv';
import * as Yup from 'yup';
import { ValidationError } from 'yup';

const dotEnvSchema = Yup.object().shape({
  IS_TS_NODE: Yup.string().oneOf(['true', 'false']),
  NODE_ENV: Yup.string().oneOf(['development', 'production']).required(),
  PORT: Yup.number(),
  KAFKA_URL: Yup.string().required(),
  KAFKA_CLIENT_ID: Yup.string().required(),
  KAFKA_API_KEY: Yup.string().required(),
  KAFKA_SECRET: Yup.string().required(),
  KAFKA_PROTOCOL: Yup.string().required(),
  KAFKA_MECHANISMS: Yup.string().required(),
});

/**
 * Checks if all needed environment variables exist
 */
export const validateEnvs = (): Dotenv.DotenvParseOutput => {
  const dotenvConfigOutput = Dotenv.config();
  if (
    dotenvConfigOutput.error !== undefined ||
    dotenvConfigOutput.parsed === undefined
  ) {
    throw dotenvConfigOutput.error;
  }
  const { parsed: envs } = dotenvConfigOutput;

  dotEnvSchema.validate(envs).catch((error: ValidationError) => {
    throw error;
  });

  return envs;
};
