import { Schema, Document, model} from 'mongoose';
import { IUser } from './UserModel';

export interface ITransaction extends Document {
    user:string|IUser;
    value: number;
    token: string;
    status: string;
}

const TransactionSchema = new Schema({
    user : { type : Schema.Types.ObjectId, ref : 'User' },
    value : { type : Number},
    token: { type : String},
    status : {type : String},
},{
    timestamps:true,
    versionKey: false
});

export const TransactionModel = model<ITransaction>('Transaction', TransactionSchema, 'transaction');