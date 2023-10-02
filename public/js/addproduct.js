document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("product-form");
  
    productForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const productName = document.getElementById("product-name").value;
      const productPrice = document.getElementById("product-price").value;
      const productQuantity = document.getElementById("product-quantity").value;
      const productImages = document.getElementById("product-image").files;
  
      if (confirm("Are you sure you want to save the data?")) {
        const container = document.querySelector(".container");
        container.style.transition = "transform 0.3s";
        container.style.transform = "scale(1.1)";
        setTimeout(function () {
          container.style.transform = "scale(1)";
        }, 300);
  
        for (let i = 0; i < productImages.length; i++) {
          console.log("Image " + (i + 1) + " Name:", productImages[i].name);
        }
  
        console.log("Product Name:", productName);
        console.log("Product Price:", productPrice);
        console.log("Quantity:", productQuantity);
  
        alert("Data has been saved successfully!");
      } else {
        alert("Save operation canceled.");
      }
    });
  
    // عرض الصور المحددة بعد اختيارها
    const productImageInput = document.getElementById("product-image");
    const imagePreview = document.getElementById("image-preview");
  
    productImageInput.addEventListener("change", function () {
      if (productImageInput.files.length > 0) {
        imagePreview.innerHTML = "";
        for (let i = 0; i < productImageInput.files.length; i++) {
          const image = document.createElement("img");
          image.src = URL.createObjectURL(productImageInput.files[i]);
          image.className = "preview-image";
          imagePreview.appendChild(image);
        }
      } else {
        imagePreview.innerHTML = "";
      }
    });
  });
  
  
  const submitBtn = document.querySelector('.save-button');
  const form = document.querySelector('#product-form');
  
  submitBtn.addEventListener('click',async(e) =>{
    e.preventDefault();
  
    const formData = new FormData();
  
    formData.append('id',id);
    formData.append('title',form.elements.name.value);
    formData.append('description',form.elements.description.value);
    formData.append('price',form.elements.price.value);
    formData.append('quantity',form.elements.quantity.value);
    formData.append('category',form.elements.category.value);
  
    for(let i = 0; i < form.elements.images.files.length; i++)
    {
      formData.append('images',form.elements.images.files[i]);
    }
  
    try { 
      const { data } = await axios.post('/admin/uploadproduct',formData);
      console.log(data);
    } catch (error) {
      console.log(error.response.data.msg)
    }
  
  })