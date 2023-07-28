const quantity = document.getElementsByClassName('custom-select');
const totalItems = document.getElementById('totalItems');
const totalPriceDom = document.getElementById('totalPrice');
const price = document.getElementsByClassName('ther');
const checkOutBtn = document.getElementsByClassName('purchase-button')[0]
const errorMsgContainer = document.getElementsByClassName('error--msg')[0];
const errorMsg = document.getElementsByClassName('error')[0];
const cart = document.getElementsByClassName('cartContainer')[0];
const warningIcon = document.getElementsByClassName('warning--icon')[0];
const trashIcon = document.getElementsByClassName('btn1');
const cartItem = document.getElementsByClassName('product');




checkOutBtn.addEventListener('click',async() =>{

    try {

        let qty = [];

        for(let j = 0; j < quantity.length; j++)
        {
            qty.push(quantity[j].value.split(' ')[1])
        }


        //sending the order 
        const { response } = await axios.post('/products/add-order',{quantity:qty});
        while(cart.firstChild)
        {
            cart.removeChild(cart.firstChild)
        }
       
        errorMsgContainer.style.display = 'flex';
        errorMsg.textContent = 'Succfully sent the order';
        errorMsg.style.color = '#22BB33';
        warningIcon.style.display = 'none';
        totalItems.textContent = 0;
        totalPriceDom.textContent = 0;
        
        
    } catch (error) {
        if(error.response.data.msg === 'Token must be provided.')
        {
            window.location.href = '/login';
        }

        if(error.response.data.msg === 'Please provide your address')
        {
            window.location.href = '/complete-data';
        }

        if(error.response.data.msg === 'Not verified')
        {
            window.location.href = '/verify';
        }
        else{
            setTimeout(()=>{
                errorMsgContainer.style.display = 'flex';
                errorMsg.textContent = error.response.data.msg;
                errorMsg.style.color = '#ff2147';
                warningIcon.style.display = 'block';
            },200)
        }
    }

})

const searchBtn = document.getElementsByClassName('searchBtn')[0];
    const searchInput= document.getElementsByClassName('searchInput')[0];

    searchBtn.addEventListener('click',()=>{
      window.location.href = `/products?search=${searchInput.value}`
    })

// setting the data 

const setQty = async() =>{
    try {
        const { data } = await axios.get('/products/cartitems',{
            headers:{
                'x-requested-with':'XMLHttpRequest'
            }
        })
        console.log(data.products)

        let totalPrice = 0;
        let totalItemsNum = 0;

        
        data.products.forEach((item,index) =>{
            let opPhase = document.getElementsByClassName(`s${index}`);
            
            for(let i = 0 ; i < cartItem.length; i++)
            {
                if(item.id === cartItem[i].dataset.id)
                {
                    for(let k = 0; k < opPhase.length;k++)
                    {
                        if(Number(opPhase[k].value.split(' ')[1]) === item.qty)
                        {
                            opPhase[k].selected = true;
                        }
                    }
                }
            }
            
            totalPrice += item.price * item.qty
            totalItemsNum += item.qty
        })

        totalPriceDom.textContent = `$${totalPrice}`;
        totalItems.textContent = totalItemsNum

    } catch (error) {
        
    }
    
}

setQty()




for(let i = 0; i < quantity.length; i++ )
{
    quantity[i].addEventListener('change',async()=>{
        const qty = quantity[i].value.split(' ')[1];
        const cartItemId = cartItem[i].dataset.id
        try {
            const { response } = await axios.put('/products/modify-cart',{id:cartItemId,qty:qty})
            setQty();
        } catch (error) {
            console.log(error);
        }
    })
}


for(let i = 0; i < cartItem.length; i++)
{
    trashIcon[i].addEventListener('click',async()=>{
        const toDeleteId = cartItem[i].dataset.id
        cartItem[i].classList.add('productDeleted')

        setTimeout(()=>{
            cartItem[i].style.display = 'none';
            setQty();
        },200)

        try {
            const { response } = await axios.delete(`/products/modify-cart/${toDeleteId}`,{
                headers:{
                    'Content-Type':'application/json'
                }
            })
        } catch (error) {
            console.log(error);
        }
    })
}