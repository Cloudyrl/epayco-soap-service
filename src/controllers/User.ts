export const myService = {
  User_Service: {
    User_Port: {
      createUser: function (args : any) {
        console.log("CreateUser called!");
        return {
          name: "Hello " + args.firstName.$value + "!",
          error:"un error"
        };
      },
    },
  },
};
