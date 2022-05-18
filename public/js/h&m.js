let carts = document.querySelectorAll('.add-cart');

let products = [ 
    {
        name: "White Coca Cola T-shirt",
        tag: "HnM1",
        price: 700,
        inCart: 0
    },
    {
        name: "Black Lower",
        tag: "HnM2",
        price: 800,
        inCart: 0
    },
    {
        name: "Off-White Sweater",
        tag: "HnM4",
        price: 1200,
        inCart: 0
    },
    {
        name: "Printed Hoddie",
        tag: "HnM5",
        price: 1500,
        inCart: 0
    },
    {
        name: "Black Jacket",
        tag: "hm1",
        price: 700,
        inCart: 0
    },
    {
        name: "Printed T-Shirt",
        tag: "hm2",
        price: 800,
        inCart: 0
    },
    {
        name: "Checked Shirt",
        tag: "hm3",
        price: 1200,
        inCart: 0
    },
    {
        name: "Blue Sweater",
        tag: "hm4",
        price: 1500,
        inCart: 0
    },
    {
        name: "Black T-shirt",
        tag: "hm5",
        price: 700,
        inCart: 0
    },
    {
        name: "Pink Top",
        tag: "hm6",
        price: 800,
        inCart: 0
    },
    {
        name: "Girl's Top",
        tag: "hm7",
        price: 1200,
        inCart: 0
    },
    {
        name: "Girl's Lower",
        tag: "hm8",
        price: 1500,
        inCart: 0
    }
];

for(let i=0; i< carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if( productNumbers ) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.products');
    
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `<div class="product"><img style="width:200px;margin-left:-2rem"  src="./Images/${item.tag}.jpeg" />
                <a class="sm-hide" style="cursor:pointer" href="/desc" >${item.name}</a>
            </div>
            <div class="price sm-hide"style="margin-left:2.4rem">Rs.${item.price}</div>
            <div class="quantity" style="margin-left:2.6rem">
                
                    <span>${item.inCart}</span>
                   
            </div>
            <div class="total"style="margin-left:-6rem">Rs.${item.inCart * item.price}</div>`;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle"style="margin-left:0rem">Basket Total</h4>
                <h4 class="basketTotal"style="margin-left:6rem">Rs.${cart}</h4>
            </div>`

    }
}


function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.product ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
           
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers();
displayCart();
