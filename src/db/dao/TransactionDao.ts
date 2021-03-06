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

export const findTransaction = async (criteria: any, projection: any = {}, options: any = {}) => {
  try {
    const response = TransactionModel.findOne(criteria, projection, options);
    return response;
  } catch (error) {
    console.error('TCL: findUser -> error', error);
    throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.errmsg}`);
  }
};

export const updateTransaction = async (criteria: any, dataToUpdate: any = {}, options: any = {}) => {
  try {
    const response = TransactionModel.findOneAndUpdate(criteria, dataToUpdate, options);
    return response;
  } catch (error) {
    throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.errmsg}`);
  }
};
