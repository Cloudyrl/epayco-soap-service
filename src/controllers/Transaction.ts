import { IUser } from '@models/UserModel';
import { ErrorHandler } from '@helpers/ErrorHandler';
import { ITransaction } from '@models/TransactionModel';
import { transactionStatus, createTransactionSchema } from '@shared/constants';
import { createTransactionSvc } from '@services/TransactionService';

export const TransactionService = {
  Transaction_Service: {
    Transaction_Port: {
      createTransaction: async function (args : any , cb : any) {
        try {
          const user = {
            document: args.document.$value,
            phone : args.phone.$value,
          }
          const value  = args.value.$value
          await createTransactionSchema.validateAsync({...user,value});
          const session_id = await createTransactionSvc(user,value);
          return {
            session_id,
            message: "Confirmation token sended to your email"
          }      
        } catch (error) {
          cb({
            Fault: {
              error: error.message ,
              statusCode: error.statusCode? error.statusCode : 500
            }
          })
        }
      },
      confirmTransaction : async function (args:any,cb:any){
        const criteria = {
          session_id: args.session_id.$value,
          token : args.token.$value
        }
        try {
          console.log(criteria)
          return {
            balance: 0,
            message: "Transaction complete"
          }  
        } catch (error) {
          cb({
            Fault: {
              error: error.message ,
              statusCode: error.statusCode? error.statusCode : 500
            }
          })
        }
      }
    },
  },
};
