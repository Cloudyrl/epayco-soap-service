import { createUserSvc, updateUserSvc } from '@services/UserService';
import { createUserSchema } from '@shared/constants';
import { IUser } from '@models/UserModel';
import { ErrorHandler } from '@helpers/ErrorHandler';

export const myService = {
  User_Service: {
    User_Port: {
      createUser: async function (args : any , cb : any) {
        try {
          const user  = {
            document: args.document.$value,
            name : args.name.$value,
            lastName : args.lastName.$value,
            email : args.email.$value,
            phone : args.phone.$value
          } as unknown as IUser
          await createUserSchema.validateAsync(user);
          user.balance = 0;
          const data = await createUserSvc(user);
          return {
            user: {
              id: data.id,
              name: data.name,
              lastName: data.lastName,
              email : data.email,
              phone : data.phone 
            },
            message: "done"
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
      rechargeWallet : async function (args:any,cb:any){
        const criteria = {
          document: args.document.$value,
          phone : args.phone.$value
        }
        const dataToUpdate = {
          $inc : { 
            balance : args.value.$value
          } 
        }
        const options = {
          new : true
        };
        try {
          const data = await updateUserSvc(criteria,dataToUpdate,options);
          if(!data) throw new ErrorHandler(404, 'User not found');
          return {
            balance: data.balance,
            message: "wallet recharged successfully"
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
