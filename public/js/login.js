const loginForm = document.getElementById('login--form');
const errorMsgContainer = document.getElementsByClassName('login--error--msg')[0];
const errorMsg = document.getElementsByClassName('errorMsg')[0];


loginForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const formData = new FormData();

    formData.append('email',loginForm.elements.email.value);
    formData.append('password',loginForm.elements.password.value)

    try {
        const {data} = await axios.post('/login',formData,{
            headers:{
                'Content-Type':'application/json'
            }
        });
       
        window.location.href = '/'
    } catch (error) {
        errorMsgContainer.style.display = 'flex';
        errorMsg.textContent = error.response.data.msg;
    }

})

const searchBtn = document.getElementsByClassName('searchBtn')[0];
    const searchInput= document.getElementsByClassName('searchInput')[0];

    searchBtn.addEventListener('click',()=>{
      window.location.href = `/products?search=${searchInput.value}`
    })