import { ITransaction } from '@models/TransactionModel';
import logger from '@shared/Logger';
import { findUserSvc } from './UserService';
import { ErrorHandler } from '@helpers/ErrorHandler';
import crypto from 'crypto';
import { transactionStatus } from '@shared/constants';
import { createTransaction, findTransaction, updateTransaction } from '@db/dao/TransactionDao';
import { jwtSign, jwtVerify } from '@helpers/jwt';
import { sendEmail } from '@helpers/email/sendEmail';
import { omit, get, has } from 'lodash'
import moment from 'moment'
import { updateUser } from '@db/dao/UserDao';

export const createTransactionSvc = async(userInfo: any , value : number)=>{
    try {
        const user = await findUserSvc(userInfo);
        if(!user) throw new ErrorHandler(404, 'User not found')
        if(value > user.balance) throw new ErrorHandler(500, 'Insufficient funds')
        const token = crypto.pseudoRandomBytes(3).toString('hex')
        const transaction = {
            user : user.id,
            value,
            token,
            status : transactionStatus.unconfirmed
        } as unknown as ITransaction
        const response = await createTransaction(transaction)
        if(!response) throw new ErrorHandler(500, 'Unexpected error while trying to create the transaction');
        const session_id = await jwtSign({
            _id : response.id,
            user : response.user,
            value : response.value
        });
        logger.info('token : '+token)
        await sendEmail(transaction.value,token,user.email);
        return session_id;
    } catch (error) {
        logger.error("TCL: createTransactionSvc -> e", error);
        throw error;
    }
}

export const confirmTransactionSvc = async(session_id: string , token : string)=>{
    try {
        const tokenPayload: any = await jwtVerify(session_id);
        if (!has(tokenPayload, 'exp') || moment().unix() >= get(tokenPayload, 'exp')) throw new ErrorHandler(401, 'UNAUTHORIZED');
        console.log(tokenPayload);
        const tokenTransaction = {
            _id : tokenPayload._id,
            user : tokenPayload.user,
            value : tokenPayload.value
        }
        const user = await findUserSvc({_id : tokenTransaction.user});
        if(!user) throw new ErrorHandler(404, 'User not found')   
        const transaction = await findTransaction({_id: tokenTransaction._id})
        if(!transaction) throw new ErrorHandler(500, 'Transaction not found');
        if(!transaction.token) throw new ErrorHandler(500, 'Transaction already confirmed');
        if(transaction.token != token) throw new ErrorHandler(401, 'UNAUTHORIZED'); 
        if(transaction.value > user.balance) throw new ErrorHandler(500, 'Insufficient funds');
        await updateTransaction({_id:transaction.id},{
            status: transactionStatus.confirmed,
            $unset : {
                token : token
            }
        })
        await updateUser({_id:tokenTransaction.user},{
            $inc : { 
                balance : transaction.value
            } 
        })
        return 'Transaction confirmed';
    } catch (error) {
        logger.error("TCL: createTransactionSvc -> e", error);
        throw error;
    }
}