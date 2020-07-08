import { createTransactionSchema } from "@shared/constants";
import {
  createTransactionSvc,
  confirmTransactionSvc,
} from "@services/TransactionService";

export const TransactionService = {
  Transaction_Service: {
    Transaction_Port: {
      createTransaction: async function (args: any, cb: any) {
        try {
          const user = {
            document: args.document.$value,
            phone: args.phone.$value,
          };
          const value = args.value.$value;
          await createTransactionSchema.validateAsync({ ...user, value });
          const session_id = await createTransactionSvc(user, value);
          return {
            session_id,
            message: "Confirmation token sended to your email",
          };
        } catch (error) {
          cb({
            Fault: {
              error: error.message,
              statusCode: error.statusCode ? error.statusCode : 500,
            },
          });
        }
      },
      confirmTransaction: async function (args: any, cb: any) {
        const session_id = args.session_id.$value;
        const token = args.token.$value;
        try {
          await confirmTransactionSvc(session_id, token);
          return {
            message: "Transaction confirmed",
          };
        } catch (error) {
          cb({
            Fault: {
              error: error.message,
              statusCode: error.statusCode ? error.statusCode : 500,
            },
          });
        }
      },
    },
  },
};
