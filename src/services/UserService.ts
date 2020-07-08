import { findUser, createUser } from '@db/dao/UserDao';
import { IUser } from '@models/UserModel';

export const createUserSvc = async (user : IUser) =>{
    try{
        return await createUser(user)
    }catch(e){
        console.error('TCL: createUserSvc -> e', e);
        throw e;
    }
}

export const findUserSvc = async (criteria: any, projection: any = {}, options: any = {}) => {
    try {
      return await findUser(criteria, projection, options);
    } catch (e) {
      console.error('TCL: findUserSvc -> e', e);
      throw e;
    }
};