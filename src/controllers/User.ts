import { createUserSvc } from '@services/UserService';
import { createUserSchema } from '@shared/constants';
import { IUser } from '@models/UserModel';

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
          console.log(error)
          cb({
            Fault: {
              error: error.message ,
              statusCode: error.statusCode? error.statusCode : 500
            }
          })
        }
      },
    },
  },
};
