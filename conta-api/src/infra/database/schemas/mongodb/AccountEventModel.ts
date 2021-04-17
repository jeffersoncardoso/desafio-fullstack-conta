import { Document } from "mongoose";
import { model, Schema } from "mongoose";


export interface AccountEventDocument extends Document {
  date: string,
  accountId: string,
  operation: any,
  previousBalance: number,
  newBalance: number
}

const AccountEventSchema = new Schema({
  date: "string",
  accountId: Schema.Types.ObjectId,
  operation: {
    type: Object
  },
  previousBalance: Number,
  newBalance: Number
});

export default model<AccountEventDocument>('account_events', AccountEventSchema);