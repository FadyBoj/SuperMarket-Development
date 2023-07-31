var slideIndex = 0;
    

    const productsContainer = document.getElementById('productTable');

    const showProducts = async()=>{
      try {
        const { data } = await axios.get('/admin/productslist')
          
        data.forEach((item) =>{
          const newElement = document.createElement('tbody')
          newElement.innerHTML = `
              <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Edit Product</th>
            <th>Delete Product</th>
          </tr>
          <tr data-value=${item._id}>
            <div class="productxx">
            <td><img class="imgx" src=${item.image} alt="Product 1"></td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td><button type="button" disabled>Edit</button></td>
            <td><button type="button" onclick="deleteProduct(this)">Delete</button></td>
          </div>
          </tr>`
          productsContainer.appendChild(newElement)
        })

      } catch (error) {
        console.log(error)
      }
    }

    showProducts();

    const loading = document.getElementsByClassName('loading--container')[0]

   async function deleteProduct(button) {
      if (confirm('Are you sure you want to delete this product?')) {
        loading.style.display = 'flex'
        try {
          var row = button.parentNode.parentNode;
          const id = row.dataset.value;
          const { response } = await axios.post('/admin/delete-product',{id:id},{
            headers:{
              'Content-Type':'application/json'
            }
          })
          loading.style.display = 'none'
          row.parentNode.remove()
        } catch (error) {
          console.log(error)
        }
        


      }
    }

    function searchProducts() {
      var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("search");
      filter = input.value.toUpperCase();
      table = document.getElementById("productTable");
      tr = table.getElementsByTagName("tr");

      for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1]; // Product name is at index 1
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }