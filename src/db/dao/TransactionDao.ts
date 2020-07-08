import { ITransaction } from '@models/TransactionModel';
import { TransactionModel } from '@models/TransactionModel'
import { ErrorHandler } from '@helpers/ErrorHandler';
import { UserModel } from '@models/UserModel';

export const createTransaction = async (transaction: ITransaction) => {
    try {
      const response = await TransactionModel.create(transaction);
      await UserModel.findByIdAndUpdate(transaction.user,{
          $push : {
              transactions : response.id
          }
      })
      return response;
    } catch (error) {
      throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};
