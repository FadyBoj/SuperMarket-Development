const signupForm = document.getElementsByClassName('signup--form')[0];
const feedbackIcon = document.getElementsByClassName('feedback--icon')[0];
const firstnameWarning = document.getElementsByClassName('firstname--warning')[0];
const firstnameWarningText = document.getElementsByClassName('firstname--warningText')[0];

const lastnameWarning = document.getElementsByClassName('lastname--warning')[0];
const lastnameWarningText = document.getElementsByClassName('lastname--warningText')[0];

const addressWarning = document.getElementsByClassName('address--warning')[0];
const addressWarningText = document.getElementsByClassName('address--warningText')[0];

const emailWarning = document.getElementsByClassName('email--warning')[0];
const emailWarningText = document.getElementsByClassName('email--warningText')[0];

const passwordWarning = document.getElementsByClassName('password--warning')[0];
const passwordWarningText = document.getElementsByClassName('password--warningText')[0];

const firstnameInput = document.getElementsByClassName('firstname')[0];
const lastnameInput = document.getElementsByClassName('lastname')[0];
const emailInput = document.getElementsByClassName('email--input')[0];
const passwordInput = document.getElementsByClassName('password--input')[0];
const addressInput = document.getElementsByClassName('address--input')[0];





const errorMessage = document.getElementById('error-message');
const errorMessageContainer = document.getElementsByClassName('error-message')[0];

const specialChars = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
const nums = [0,1,2,3,4,5,6,7,8,9]

function checkValid(name){

    spe = false;
    numC = false;

    for(let i = 0; i < specialChars.length; i++){
        
        if(name.includes(specialChars[i])){
            spe = true;
            break;
        }
    }

    for(let j = 0; j < nums.length; j++)
    {
        if(name.includes(nums[j]))
        {
        numC = true;
        break;
        }
    }

    if (spe === true && numC === true)
    return true;
    else return false;
   
}


signupForm.addEventListener('submit',async (event) =>{
    event.preventDefault();

    let numbers =[0,1,2,3,4,5,6,7,8,9]

    let send = true;

    //firstname validating
    let firstnameMessages = [];

    if(firstnameInput.value.length === 0){
    firstnameMessages.push('First name required');
    }
    if(firstnameInput.value.length < 3)
    firstnameMessages.push('Too short use at least 3 characters');

    if(firstnameMessages.length > 0){
    firstnameWarning.style.display = 'flex';
    firstnameInput.style.cssText = 'outline:solid 2px #ff2147'
    firstnameWarningText.textContent = firstnameMessages[0];
    send = false;
    }
    else{
    firstnameWarning.style.display = 'none';
    firstnameInput.style.cssText = 'outline:solid 2px rgb(59, 142, 224)'
    firstnameWarningText.textContent = firstnameMessages[0];
    }

    firstnameInput.addEventListener('input',() =>{
        let firstnameMessages = [];

    if(firstnameInput.value.length === 0){
    firstnameMessages.push('First name required');
    }
    if(firstnameInput.value.length < 3)
    firstnameMessages.push('Too short use at least 3 characters');

    if(firstnameMessages.length > 0){
    firstnameWarning.style.display = 'flex';
    firstnameInput.style.cssText = 'outline:solid 2px #ff2147'
    firstnameWarningText.textContent = firstnameMessages[0];
    send = false;
    }
    else{
    firstnameWarning.style.display = 'none';
    firstnameInput.style.cssText = 'outline:solid 2px rgb(59, 142, 224)'
    firstnameWarningText.textContent = firstnameMessages[0];
    }
    })


    //lastname validating

    let lastnameMessages = [];

    if(lastnameInput.value.length === 0){
    lastnameMessages.push('last name required');
    }
    if(lastnameInput.value.length < 3)
    lastnameMessages.push('Too short use at least 3 characters');

    if(lastnameMessages.length > 0){
    lastnameWarning.style.display = 'flex';
    lastnameInput.style.cssText = 'outline:solid 2px #ff2147'
    lastnameWarningText.textContent = lastnameMessages[0];
    send = false;
    }
    else{
    lastnameWarning.style.display = 'none';
    lastnameInput.style.cssText = 'outline:solid 2px rgb(59, 142, 224)'
    lastnameWarningText.textContent = lastnameMessages[0];
    }

    lastnameInput.addEventListener('input',() =>{
        let lastnameMessages = [];

    if(lastnameInput.value.length === 0){
    lastnameMessages.push('last name required');
    }
    if(lastnameInput.value.length < 3)
    lastnameMessages.push('Too short use at least 3 characters');

    if(lastnameMessages.length > 0){
    lastnameWarning.style.display = 'flex';
    lastnameInput.style.cssText = 'outline:solid 2px #ff2147'
    lastnameWarningText.textContent = lastnameMessages[0];
    send = false;
    }
    else{
    lastnameWarning.style.display = 'none';
    lastnameInput.style.cssText = 'outline:solid 2px rgb(59, 142, 224)'
    lastnameWarningText.textContent = firstnameMessages[0];
    }
    })


    //email validating

    let emailMessages = []

    if(emailInput.value.length === 0)
    emailMessages.push('Email is required');

    if(emailInput.value.split('@')[0].length < 5 || !emailInput.value.includes('@') || !emailInput.value.endsWith('.com'))
    emailMessages.push('Enter a valid email address');

    if(emailMessages.length > 0)
    {
        emailWarning.style.display = 'flex';
        emailWarningText.textContent = emailMessages[0];
        emailInput.style.cssText = 'outline:solid 2px #ff2147'
        send = false;
    }
    else{
        emailWarning.style.display = 'none';
        emailInput.style.cssText = 'outline:solid 2px rgb(59, 142, 224)'
    }

    emailInput.addEventListener('input',() =>{
        let emailMessages = []

    if(emailInput.value.length === 0)
    emailMessages.push('Email is required');

    if(emailInput.value.split('@')[0].length < 5 || !emailInput.value.includes('@') || !emailInput.value.endsWith('.com'))
    emailMessages.push('Enter a valid email address');

    if(emailMessages.length > 0)
    {
        emailWarning.style.display = 'flex';
        emailWarningText.textContent = emailMessages[0];
        emailInput.style.cssText = 'outline:solid 2px #ff2147'
        send = false;
    }
    else{
        emailWarning.style.display = 'none';
        emailInput.style.cssText = 'outline:solid 2px rgb(59, 142, 224)'
    }
    })

    //password validating

    let passwordMessages = [];
    if(passwordInput.value.length === 0)
    passwordMessages.push('Password is required');

    if(passwordInput.value.length < 8)
    passwordMessages.push('Too short use at least 8 characters')

    if(!checkValid(passwordInput.value))
    passwordMessages.push('Password must contain a number and a special character.')

    if(passwordMessages.length > 0)
    {
        passwordWarning.style.display = 'flex';
        passwordWarningText.textContent = passwordMessages[0];
        passwordInput.style.cssText = 'outline:solid 2px #ff2147'
        send = false;
    }
    else{
        passwordInput.style.cssText = 'outline:solid 2px rgb(59, 142, 224)'
        passwordWarning.style.display = 'none';
    }

    passwordInput.addEventListener('input',() =>{
        let passwordMessages = [];
        if(passwordInput.value.length === 0)
        passwordMessages.push('Password is required');
    
        if(passwordInput.value.length < 8)
        passwordMessages.push('Too short use at least 8 characters')
    
        if(!checkValid(passwordInput.value))
        passwordMessages.push('Password must contain a number and a special character.')
    
        if(passwordMessages.length > 0)
        {
            passwordWarning.style.display = 'flex';
            passwordWarningText.textContent = passwordMessages[0];
            passwordInput.style.cssText = 'outline:solid 2px #ff2147'
            send = false;
        }
        else{
            passwordInput.style.cssText = 'outline:solid 2px rgb(59, 142, 224)'
            passwordWarning.style.display = 'none';
        }
    })

    //address validating

    let addressMsg = [];
    if(addressInput.value.length === 0)
    {
        addressMsg.push('Address is required')
    }

    if(addressInput.value.length < 5)
    {
        addressMsg.push('Please enter a valid address')
    }


    if(addressMsg.length > 0)
    {
        addressWarning.style.display = 'flex';
        addressWarningText.textContent = addressMsg[0];
        addressInput.style.cssText = 'outline:solid 2px #ff2147'
        send = false;
    }
    else{
        addressInput.style.cssText = 'outline:solid 2px rgb(59, 142, 224)'
        addressWarning.style.display = 'none';
    }

    addressInput.addEventListener('input',()=>{
        let addressMsg = [];
    if(addressInput.value.length === 0)
    {
        addressMsg.push('Address is required')
    }

    if(addressInput.value.length < 5)
    {
        addressMsg.push('Please enter a valid address')
    }


    if(addressMsg.length > 0)
    {
        addressWarning.style.display = 'flex';
        addressWarningText.textContent = addressMsg[0];
        addressInput.style.cssText = 'outline:solid 2px #ff2147'
        send = false;
    }
    else{
        addressInput.style.cssText = 'outline:solid 2px rgb(59, 142, 224)'
        addressWarning.style.display = 'none';
    }
    })

    //sending data

    const formData = new FormData();
    formData.append('firstname',signupForm.elements.firstname.value);
    formData.append('lastname',signupForm.elements.lastname.value);
    formData.append('email',signupForm.elements.email.value);
    formData.append('password',signupForm.elements.password.value);
    formData.append('address',signupForm.elements.address.value)

    if(send){
    try {
        const { data } = await  axios.post('/register/createuser',formData,{
            headers:{
                'Content-Type':'application/json'
            }
        });

        window.location.href = '/verify'

    } catch (error) {
        if(error.response.status === 409)
        {
            let errorMsg = {msg:"User exsist"}
            localStorage.setItem('register-status',JSON.stringify(errorMsg));
            window.location.href = '/login'
        }
        if(error.response.data.msg.includes(','))
        return;
        if(error.response.data.msg === 'Weak password')
        {
            passwordWarning.style.display = 'flex';
            passwordWarningText.textContent = error.response.data.msg;
            passwordInput.style.cssText = 'outline:solid 2px #ff2147'
        }
        else{
        passwordInput.style.cssText = 'outline:solid 2px rgb(59, 142, 224)'
        passwordWarning.style.display = 'none';
        errorMessageContainer.style.display = 'flex';
        feedbackIcon.style.display = 'flex'
        errorMessage.style.color = '#ff2147'
        errorMessage.textContent = error.response.data.msg;
        }
        
    }
}

})
