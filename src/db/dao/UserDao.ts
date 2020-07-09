import { IUser, UserModel } from '@models/UserModel';
import { ErrorHandler } from '@helpers/ErrorHandler/index';

export const createUser = async (user: IUser) => {
    try {
      const response = await UserModel.create(user);
      return response;
    } catch (error) {
      if (error.name === 'MongoError' && error.code === 11000) throw new ErrorHandler(500, Object.keys(error.keyValue)[0]+` has to be unique`)
      throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findUser = async (criteria: any, projection: any = {}, options: any = {}) => {
  try {
    const response = UserModel.findOne(criteria, projection, options);
    return response;
  } catch (error) {
    console.error('TCL: findUser -> error', error);
    throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.errmsg}`);
  }
};

export const updateUser = async (criteria: any, dataToUpdate: any = {}, options: any = {}) => {
  try {
    const response = UserModel.findOneAndUpdate(criteria, dataToUpdate, options);
    return response;
  } catch (error) {
    throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.errmsg}`);
  }
};