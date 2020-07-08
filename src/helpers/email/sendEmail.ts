import nodemailer from "nodemailer";

export const sendEmail = async (amount:number,token:string, email:string = 'example@example.com') => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "650b340ea0d499",
          pass: "17e691218039b1",
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
