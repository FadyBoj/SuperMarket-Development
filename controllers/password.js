const zxcvbn = require('zxcvbn')


function checkPw(password)
{
    const numbers = [0,1,2,3,4,5,6,7,8,9];
    let valid = false;
    
    for(let i = 0; i < password.length;i++)
    {
        if(valid === true){
        break;}
        for(let k = 0; k < numbers.length;k++)
        {
            if(Number(password[i]) === numbers[k]){
            valid = true;
            break;
            }
        }
    }

    return valid;
}

module.exports = checkPw;
