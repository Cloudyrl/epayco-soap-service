import nodemailer from "nodemailer";

export const sendEmail = async (amount:number,token:string, email:string = 'example@example.com') => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 2525,
        auth: {
          user: process.env.EMAIL_HOST_USER,
          pass: process.env.EMAIL_HOST_PASSWORD,
        },
      });

    const mailOptions = {
        from: '"Epayco Team" <from@epayco.com>',
        to: email,
        subject: 'Confirm Transaction',
        text: 'Hey there, pls confim your transaction ', 
        html: `<h1>Hey there! </h1>
        <h2> Please confirm your transaction<h2>
        <span>Amount: ${amount}<span><br>Token : ${token}`
    };

    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};
