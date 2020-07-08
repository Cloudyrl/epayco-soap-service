import { IUser, UserModel } from '@models/UserModel';
import { ErrorHandler } from '@helpers/ErrorHandler/index';

export const createUser = async (user: IUser) => {
    try {
      const response = await UserModel.create(user);
      return response;
    } catch (error) {
      console.log(error)
      throw new ErrorHandler(500, `${error.name} ${error.message}`);
    }
};

export const findUser = async (criteria: any, projection: any = {}, options: any = {}) => {
  try {
    const response = UserModel.findOne(criteria, projection, options)
      .populate('Albums')
      .populate('Photos');
    return response;
  } catch (error) {
    console.error('TCL: findUser -> error', error);
    throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.errmsg}`);
  }
};