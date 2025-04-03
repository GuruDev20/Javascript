const imageContainer=document.getElementById("image-container");
const loading=document.querySelector(".loading");

let page=1;
const accessKey="FpXRShwbSCRztM3OUeiQHxA-tIJsq9yTY6I4lPGdvA4";
const perPage=12;
let isLoading=false;

async function fetchImages(){
    if (isLoading){
        return;
    }
    isLoading=true;
    loading.style.display="block";
    try{
        const response=await fetch(`https://api.unsplash.com/photos?page=${page}&per_page=${perPage}&client_id=${accessKey}`);
        const images=await response.json();
        images.forEach(image=>{
            const imgElement=document.createElement("img");
            imgElement.src=image.urls.small;
            imgElement.alt=image.alt_description || "Image";
            imageContainer.appendChild(imgElement);
        });
        page++;
    } 
    catch(error){
        console.error("Error fetching images:", error);
    } 
    finally{
        isLoading=false;
        loading.style.display="none";
    }
}

function handleScroll() {
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-500) {
        fetchImages();
    }
}

window.addEventListener("scroll", handleScroll);

fetchImages();