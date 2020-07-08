import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
    document:string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    balance: number
}

const UserSchema = new Schema({
    document : { type : String},
    name : { type : String},
    lastName: { type : String},
    email : {type : String},
    phone : {type : String},
    balance: {type : Number}
},{
    timestamps:true,
    versionKey: false
})

export const UserModel = model<IUser>('User', UserSchema, 'user');