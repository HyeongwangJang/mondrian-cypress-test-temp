import { defineConfig } from "cypress";
import dotenv from 'dotenv';
import sendAnEmail from "./cypress/plugins/sendAnEmail.js";
import { getWeekNumberAndMonthAndYear } from "./src/utils/dateUtil.js";

dotenv.config();

export default defineConfig({
  env: {
    ...process.env,
  },
  e2e: {
    experimentalInteractiveRunEvents: true,
    video: true,
    videoCompression: true,
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('after:run', async (results) => {
        const title = getWeekNumberAndMonthAndYear(new Date());
        const message = results.totalPassed + ' out of ' + results.totalPassed + ' passed';
        await sendAnEmail(title, message, process.env.SENDGRID_API_KEY, process.env.SENDGRID_FROM, process.env.SENDGRID_TO);
      })
    },
  },
});
