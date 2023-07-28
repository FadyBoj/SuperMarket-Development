// dziwrpcuvqfkpgty
const nodemailer = require('nodemailer');

const sendemail = async (reciever,v_code) =>{
    try {
        
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'webdevelop701@gmail.com',
                pass:'dziwrpcuvqfkpgty'
            }
        });

        //send mail

        await transporter.sendMail({
            from:'Fady',
            to:reciever,
            subject:'test email',
            html:`
            
            <body style="background-color:white;width:100%;min-height:100vh;
                        text-align:center">

                <div style=" color:white;margin:auto;background-color:black;width:600px;height:100%;text-align:left;">
                    <img style="vertical-align:bottom;margin-left:20px;margin-top:50px;" width="55px" src="https://cdn.discordapp.com/attachments/1079474965616795810/1122843580940169216/logo1.png">
                    <div style="width:100%;font-family:cursive;display:inline;font-size:17px">Super Market</div><br><br><br><br>

                    <div style="text-align: center;font-size:30px;margin:0px;">Your Verification code
                        <br><div style="letter-spacing: 10px;font-family:fantasy"><span style="color:#10b6ed">${v_code}</span></div>
                    </div><br><br><br><br><br>

                    <div style="margin-left:25px;margin-right:25px">This code is valid for 30 Minutes</div>
                    <div style="margin-left:25px;margin-right:25px;font-weight:700;color:#10b6ed">  <br><br>
                        Don’t know why you’re getting this email?<br></div>
                    <div style="margin-left:25px;margin-right:25px;"><p>We sent this email to help you log in to your Demo account.<br><br>
                            
                    If you didn’t try to log in to your account or request this email<br>
                    don’t worry, your email address may have been entered by mistake.<br>
                    You can simply ignore or delete this email, and use your existing<br> password to log in.<br><br><br>
                        
                    Happy listening!<br><br>

                    This message was sent to: ${reciever}
            </p></div><br><br>

                </div>
            </body>
            

            `
        })
        console.log('success')
    } catch (error) {
        
    }
}

module.exports = sendemail;