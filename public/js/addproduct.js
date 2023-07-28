// authorize

const sendHeaders = async() =>{
    await axios.get('/admin/addproduct',{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
    })
}

sendHeaders();





const submitBtn = document.getElementById('submitBtn');
const form = document.getElementById('product--form')



submitBtn.addEventListener('click', async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('title', form.elements.title.value);
    formData.append('price', form.elements.price.value);
    formData.append('category', form.elements.category.value);
    formData.append('image', form.elements.image.files[0]);
    formData.append('quantity', form.elements.quantity.value);
  
    try {
        const { data } = await axios.post('/admin/uploadproduct', formData);
        console.log(data);
    } catch (error) {
        console.log(error.response.data.msg)
    }
 
  });

