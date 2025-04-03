const productContainer=document.getElementById("product_list")
const cartModel=document.getElementById("cart_model")
const cartItemsContainer=document.querySelector(".cart_items")
const cartTotal=document.getElementById("cart_total")
const cartCount=document.getElementById("cart_count")
const searchInput=document.getElementById("search")
const closeBtn=document.querySelector(".close")
const viewCart=document.getElementById("view_cart")
const checkoutBtn=document.getElementById("checkout")

let cart=JSON.parse(localStorage.getItem("cart")) || []
let products=[]

async function fetchProducts(){
    try{
        const response=await fetch("https://fakestoreapi.com/products/category/electronics")
        products=await response.json()
        console.log(products)
        renderProducts(products)
    }
    catch(error){
        console.error("Error fetching products:", error)
    }
}

function renderProducts(products){
    productContainer.innerHTML=""
    products.forEach(product=>{
        const productDiv=document.createElement("div")
        productDiv.classList.add("product")
        productDiv.innerHTML=`
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button class="add_to_cart" data-id="${product.id}">Add to Cart</button>
        `;
        productContainer.appendChild(productDiv)
    })

    document.querySelectorAll(".add_to_cart").forEach(button => {
        button.addEventListener("click", function () {
            const productId = parseInt(this.getAttribute("data-id"));
            addToCart(productId);
        });
    });
}

function addToCart(productId){
    const product=products.find(p=>p.id===productId)
    const existingProduct=cart.find(p=>p.id===productId)
    if(existingProduct){
        existingProduct.quantity+=1;
    }
    else{
        cart.push({...product, quantity: 1})
    }

    updateCart()
}

function updateCart(){
    cartItemsContainer.innerHTML=""
    let total=0
    cart.forEach(item=>{
        const itemDiv=document.createElement("div");
        itemDiv.classList.add("cart_item");
        itemDiv.innerHTML=`
            <h3>${item.title}</h3>
            <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            <button class="remove" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemDiv)
        total+=item.price*item.quantity
    })

    cartTotal.textContent=total.toFixed(2)
    cartCount.textContent=cart.length;
    localStorage.setItem("cart", JSON.stringify(cart))

    document.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", function () {
            const productId = parseInt(this.getAttribute("data-id"));
            removeFromCart(productId);
        });
    });
}

function removeFromCart(productId){
    cart=cart.filter(item=>item.id!==productId)
    updateCart()
}

searchInput.addEventListener("input", function(){
    const searchValue=searchInput.value.toLowerCase()
    const filteredProducts=products.filter(product=>product.title.toLowerCase().includes(searchValue))
    renderProducts(filteredProducts)
})

viewCart.addEventListener("click", function(){
    cartModel.style.display="block"
    updateCart()

})

closeBtn.addEventListener("click", function(){
    cartModel.style.display="none"
})

checkoutBtn.addEventListener("click", function(){
    alert("Checkout successful!")
    cart=[]
    updateCart()
    cartModel.style.display="none"
})

window.addEventListener("click", function(event){
    if(event.target===cartModel){
        cartModel.style.display="none"
    }
})


fetchProducts()
updateCart()