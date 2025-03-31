const images=document.querySelectorAll(".image");
const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightbox_image");
const closeBtn=document.getElementById("close");

images.forEach(image=>{
    image.addEventListener("click",()=>{
        lightbox.classList.add("active");
        lightboxImage.src=image.src;
    });
});

closeBtn.addEventListener("click",()=>{
    lightbox.classList.remove("active");
});