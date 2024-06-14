/** @type {import('next').NextConfig} */
const { string, object } = require("yup");
const { generateSampleEnv, validateEnv } = require("./env.utils.js");

const envConfig = {
  envType: process.env.NEXT_PUBLIC_ENV_TYPE,
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
};

module.exports = envConfig;

const envConfigSchema = object({
  NEXT_PUBLIC_ENV_TYPE: string()
    .oneOf(["TEST", "DEV", "ALPHA", "PRODUCTION"])
    .default("DEV")
    .label("\n# Deployment Environment type"),
  NEXT_PUBLIC_SUPABASE_URL: string()
    .required("Supabase Project URL ")
    .label("\n# Supabase Project URL"),
  NEXT_PUBLIC_SUPABASE_KEY: string().required().label("\n# Supabase anon key"),
});

validateEnv(envConfigSchema);

module.exports = {
  reactStrictMode: true,
  swcMinify: false,
  env: envConfig,
};
