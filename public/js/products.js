const products = document.getElementsByClassName('prod')[0];

const queryObject = window.location.href.split('?')[1];

const showProducts = async () =>{
    const response = await fetch(`api/products?${queryObject}`);
    const data = await response.json();

    for(let i = 0; i < data.length; i++)
    {
        const newCard = document.createElement('div');
        newCard.innerHTML = `
        
      <div style='background-image: url(${data[i].image})' class="image">
      </div>
      <span class="productId">${data[i]._id}</span>
      <span class="title">${data[i].title}</span>
      <span class="price">${data[i].price}</span>
    `;
    newCard.classList.add('card')
    products.appendChild(newCard)
    }

    cartFunctionality();

}


cartFunctionality = ()=>{
  const allProducts = document.getElementsByClassName('card');
  const productId = document.getElementsByClassName('productId');

  for(let i = 0; i < allProducts.length; i++)
  {
    allProducts[i].addEventListener('click',async()=>{
      try {
        const {data} = await axios.post('/products/add-to-cart',{id:productId[i].textContent})
        console.log(data)
      } catch (error) {
        console.log(error.response.data.msg)
      }
    })
  }
}

showProducts();

const searchBtn = document.getElementsByClassName('searchBtn')[0];
    const searchInput= document.getElementsByClassName('searchInput')[0];

    searchBtn.addEventListener('click',()=>{
      window.location.href = `/products?search=${searchInput.value}`
    })