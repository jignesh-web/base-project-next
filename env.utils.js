const path = require("path");
const { writeFileSync } = require("fs");

// ANSI escape codes for text colors
const redColor = "\x1b[31m"; // Red
const cyanColor = "\x1b[36m"; // Cyan
const resetColor = "\x1b[0m"; // Reset color

/**
 * Generates an environment sample file based on validation schema.
 * @param {object} configurationValidation - Yup validation schema.
 */
const generateSampleEnv = (configurationValidation) => {
  const yupModel = configurationValidation.describe();
  let output = "";
  Object.keys(yupModel.fields).forEach((key) => {
    const keyObject = yupModel.fields[key];
    const label = keyObject?.label;
    const finalLabel = label ? `${label}\n` : "";

    let value = `<${key}>`;
    if (yupModel.default[key] !== undefined) {
      value = yupModel.default[key];
    }
    if (keyObject?.oneOf?.length) {
      value = `<${keyObject?.oneOf.join(" | ")}>`;
    }
    output += `${finalLabel}${key}=${value}\n`;
  });
  const filePath = path.join(process.cwd(), "env.sample");
  writeFileSync(filePath, output);
  return filePath; // Return the file path for reference
};

/**
 * Validates the current environment variables against a schema.
 * @param {object} configurationValidation - Yup validation schema.
 */
const validateEnv = async (configurationValidation) => {
  try {
    const validationResult = await configurationValidation.validate(
      process.env,
      {
        abortEarly: false,
        allowUnknown: true,
        disableStackTrace: true,
      }
    );

    if (validationResult.error) {
      throw validationResult.error;
    }
  } catch (error) {
    if (error.inner && error.inner.length > 0) {
      const missingEnvVariables = error.inner
        .map(({ path }) => `  - ${path}`)
        .join("\n");
      const filePath = generateSampleEnv(configurationValidation); // Generate env.sample
      console.log(`${redColor} Error: The following environment variables are required:\n${missingEnvVariables}\n\nPlease refer to ${cyanColor}${filePath}${resetColor}${redColor} for details.
        ${resetColor}`);
      process.exit(1);
    } else {
      console.error(`Validation failed: ${error.message}`);
      process.exit(1);
    }
  }
};

module.exports = {
  validateEnv,
};
