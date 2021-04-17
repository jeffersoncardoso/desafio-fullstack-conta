import { Document } from "mongoose";
import { model, Schema } from "mongoose";

export interface AccountModel extends Document {
  balance: number,
  user: string
}

const AccountSchema = new Schema({
  balance: "number",
  user: String
});

export default model<AccountModel>('accounts', AccountSchema);