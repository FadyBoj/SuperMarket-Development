

var slideIndex = 0;
    showSlides();

    function showSlides() {
      var slides = document.querySelectorAll("#slideshow img");

      for (var i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0";
      }

      slideIndex++;

      if (slideIndex > slides.length) {
        slideIndex = 1;
      }

      slides[slideIndex - 1].style.opacity = "1";

      setTimeout(showSlides, 7000);
    }

    // استهدام العناصر التي سنحتاجها
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');
    const slideshow = document.getElementById('slideshow');
    const images = slideshow.getElementsByTagName('img');
    let currentImageIndex = 0;

    // الوظيفة المسؤولة عن التحكم بالصور في العرض التمريري
    function changeImage(index) {
      if (index < 0 || index >= images.length) {
        return;
      }

      for (let i = 0; i < images.length; i++) {
        images[i].style.opacity = '0';
      }

      images[index].style.opacity = '1';
      currentImageIndex = index;
    }

    // الوظيفة المسؤولة عن التحكم بالصورة السابقة
    function prevImage() {
      let newIndex = currentImageIndex - 1;
      if (newIndex < 0) {
        newIndex = images.length - 1;
      }
      changeImage(newIndex);
    }

    // الوظيفة المسؤولة عن التحكم بالصورة التالية
    function nextImage() {
      let newIndex = currentImageIndex + 1;
      if (newIndex >= images.length) {
        newIndex = 0;
      }
      changeImage(newIndex);
    }

    // إضافة استماع للنقر على الأسهم للتبديل بين الصور
    prevArrow.addEventListener('click', prevImage);
    nextArrow.addEventListener('click', nextImage);

    // عرض الصورة الأولى عند تحميل الصفحة
    changeImage(0);

    // Search
    function search() {
      var searchInput = document.getElementById("searchInput").value;
      alert("Searching for: " + searchInput);
    }

    const searchBtn = document.getElementsByClassName('searchBtn')[0];
    const searchInput= document.getElementsByClassName('searchInput')[0];

    searchBtn.addEventListener('click',()=>{
      window.location.href = `/products?search=${searchInput.value}`
    })