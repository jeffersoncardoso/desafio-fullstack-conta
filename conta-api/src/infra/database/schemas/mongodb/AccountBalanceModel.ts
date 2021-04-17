import { Document, Model } from "mongoose";
import { model, Schema } from "mongoose";

export type AccountBalanceDocument = Document

export type AccountBalanceModel = Model<AccountBalanceDocument>

const AccountBalanceSchema = new Schema({
  accountId: "number",
  value: "number"
});

export default model<AccountBalanceDocument, AccountBalanceModel>("account_balance", AccountBalanceSchema);