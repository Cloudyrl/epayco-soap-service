import { ITransaction } from '@models/TransactionModel';
import logger from '@shared/Logger';
import { findUserSvc } from './UserService';
import { ErrorHandler } from '@helpers/ErrorHandler';
import crypto from 'crypto';
import { transactionStatus } from '@shared/constants';
import { createTransaction } from '@db/dao/TransactionDao';
import { jwtSign } from '@helpers/jwt';
import { sendEmail } from '@helpers/email/sendEmail';

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
        const session_id = await jwtSign({...response.toObject()});
        await sendEmail(transaction.value,token);
        return session_id;
    } catch (error) {
        logger.error("TCL: createTransactionSvc -> e", error);
        throw error;
    }
}