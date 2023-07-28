const googleForm = document.getElementById('google--form');
const errorContainer = document.getElementsByClassName('error--msg--container')[0];
const errorMsg = document.getElementsByClassName('error--msg')[0];
const warningIcon = document.getElementsByClassName('warning--icon')[0]
googleForm.addEventListener('submit',async(e)=>{

    e.preventDefault();

    const formData = new FormData();

    formData.append('firstname',googleForm.elements.firstname.value);
    formData.append('lastname',googleForm.elements.lastname.value);
    formData.append('phonenumber',googleForm.elements.phonenumber.value);
    formData.append('address',googleForm.elements.address.value);

    try {
        const { response } = await axios.post('/complete-data',formData,{
            headers:{
                'Content-Type':'application/json'
            }
        })

        errorMsg.style.color = '#22BB33'
        warningIcon.style.display = 'none';
        window.location.href = '/'
    } catch (error) {
        errorContainer.style.display = 'flex';
        errorMsg.style.color = '#ff2147'
        errorMsg.textContent = error.response.data.msg;
        warningIcon.style.display = 'block';

    }

    
})