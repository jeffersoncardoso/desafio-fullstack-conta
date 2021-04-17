import { app } from "./src/app";

import { config as dotenv } from "dotenv";
dotenv();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

import db from '@database/database';
db.connect();

import * as Cron from 'node-cron';
import { ProfitCalculatorService } from "@services/ProfitCalculatorService";

if(process.env.CRON_PROFIT == "1") {
  Cron.schedule('* * * * *', async () => { //Running every minute
    const result = await ProfitCalculatorService.execute();
  });
}
