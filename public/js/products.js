
const productsPerPage = 20; // عدد المنتجات في كل صفحة
let currentPage = 1; // الصفحة الحالية

async function displayProducts(page) {

  const { data } = await axios.get('/api/products');
  const products = data.map((item) =>{
    return {
      id:item._id,
      imgSrc:item.images[0],
      title:item.title, 
      price:`$${item.price}`
    }
  })



  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const productContainer = document.querySelector(".product-container");
  productContainer.innerHTML = "";

  currentProducts.forEach((product, index) => {
    const card = document.createElement('div');
     card.classList.add("card");

    const cardImg = document.createElement("div");
    const imgHref = document.createElement('a');
    imgHref.setAttribute('href',`/products/single/${product.id}`)
    cardImg.classList.add("card-img");
    const img = document.createElement("img");
    img.classList.add("images");
    img.src = product.imgSrc;
    img.alt = "وصف الصورة";
    imgHref.appendChild(img)
    cardImg.appendChild(imgHref);

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");
    const title = document.createElement("p");
    title.classList.add("text-title");
    title.textContent = product.title;
    cardInfo.appendChild(title);

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    const price = document.createElement("span");
    price.classList.add("text-title");
    price.textContent = product.price;
    const cardButton = document.createElement("div");
    cardButton.classList.add("card-button");

    cardButton.addEventListener('click',async() =>{
      try {
        const { data } = await axios.post('/products/add-to-cart',{id:product.id})
        window.alert("Successfully added to cart")
      } catch (error) {
        window.alert("Already in the cart")
      }
    })

    // إضافة الرمز الجديد للعربة هنا
    const svgIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    svgIcon.classList.add("svg-icon");
    svgIcon.setAttribute("viewBox", "0 0 20 20");
    svgIcon.innerHTML = `
<path
        d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"
      ></path>
      <path
        d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"
      ></path>
      <path
        d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"
      ></path>
`;

    cardButton.appendChild(svgIcon);

    cardFooter.appendChild(price);
    cardFooter.appendChild(cardButton);

    card.appendChild(cardImg);
    card.appendChild(cardInfo);
    card.appendChild(cardFooter);

    productContainer.appendChild(card);
  });
}

function createPaginationButtons() {
  const totalPages = Math.ceil(products.length / productsPerPage);
  const paginationElement = document.querySelector(".pagination");

  paginationElement.innerHTML = ""; // مسح الأزرار السابقة

  // إضافة زر الصفحة السابقة
  const prevPageButton = document.createElement("span");
  prevPageButton.id = "prevPage";
  prevPageButton.classList.add("pagination-arrow");
  prevPageButton.textContent = "⇦";
  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayProducts(currentPage);

      // التمرير إلى بداية الصفحة
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // إضافة زر الصفحة التالية
  const nextPageButton = document.createElement("span");
  nextPageButton.id = "nextPage";
  nextPageButton.classList.add("pagination-arrow");
  nextPageButton.textContent = "⇨";
  nextPageButton.addEventListener("click", () => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayProducts(currentPage);

      // التمرير إلى بداية الصفحة
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  paginationElement.appendChild(prevPageButton);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", () => {
      currentPage = i;
      displayProducts(currentPage);

      // التمرير إلى بداية الصفحة
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    if (i === currentPage) {
      button.classList.add("active"); // تمييز الصفحة الحالية
    }

    paginationElement.appendChild(button);
  }

  paginationElement.appendChild(nextPageButton);
}

// قم بعرض الصفحة الأولى عند تحميل الصفحة
displayProducts(currentPage);

// قم بإنشاء أزرار الصفحات
createPaginationButtons();
