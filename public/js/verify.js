const verifyForm = document.getElementById('verify--form');
const errorMsgContainer = document.getElementsByClassName('error--msg--container')[0];
const errorMsg = document.getElementsByClassName('error--msg')[0];
verifyForm.addEventListener('submit',async(e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('verificationCode',verifyForm.elements.verificationCode.value);

    try {
        const { data } = await axios.post('/verify-user',formData,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        //success

        console.log(data);
        window.location.href = '/'

    } catch (error) {
        errorMsgContainer.style.display = 'flex';
        errorMsg.textContent = error.response.data.msg
    }
    
})