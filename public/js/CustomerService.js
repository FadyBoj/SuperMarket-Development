
const complainForm = document.getElementsByClassName('complain--form')[0];

complainForm.addEventListener('submit',async(event) =>{
    event.preventDefault();

    const formData = new FormData();
    formData.append('name',complainForm.elements.name.value);
    formData.append('email',complainForm.elements.email.value);
    formData.append('message',complainForm.elements.message.value);
    formData.append('image',complainForm.elements.image.files[0]);



    try {
        const { data } = await axios.post('/customer-service',formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
    
    } catch (error) {
        console.log(error);
    }
   
})