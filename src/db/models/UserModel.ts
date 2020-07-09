import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
    document:string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    balance: number
    transactions: any[]
}

const UserSchema = new Schema({
    document : { type : String, unique : true},
    name : { type : String},
    lastName: { type : String},
    email : {type : String, unique : true},
    phone : {type : String, unique : true},
    balance: {type : Number},
    transactions: [{type : Schema.Types.ObjectId, ref : 'Transaction'}]
},{
    timestamps:true,
    versionKey: false
});

export const UserModel = model<IUser>('User', UserSchema, 'user');