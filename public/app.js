const items = document.querySelector(".items")
var openpopup = document.querySelector(".profile-icon")
var closepopup = document.querySelector(".popup .close-btn")


openpopup.addEventListener("click", function(){
    document.body.classList.add("popup-active");
});

closepopup.addEventListener("click", function(){
    document.body.classList.remove("popup-active");
});


const EventListeners = ()=>{
    window.addEventListener('DOMContentLoaded', ()=>{
        loadJSON();
    })
}
EventListeners()
function loadJSON(){
    fetch('items.json').then(response => response.json()).then(data =>{
        let html = '';
        data.forEach(item => {
            html += `
            <div class="item-content">
            <div class="imgandbtn">
            <button class="add-cart ${item.name}"><span style="margin-bottom:1rem;"><span style="font-size:1rem;" class="material-icons-round">shopping_cart</span> Add to Cart</span></button>
            <img src="${item.img}" alt=""> 
            </div>
            <p><b>${item.name}</b></p>
            <p style="font-size: 0.8vw; margin-top: 0.1vw; color: rgba(240, 240, 240, 0.233);">${item.Description}</p>
            <p style="margin-top: 0.6vw;"><b>${item.price}</b> </p>
            <p style="font-size: 11px; margin-top: -1vw; margin-left: 5vw; color: darkred;">${item.offer}</p>
            </div>
            `;
        });
    items.innerHTML = html;
    })
}

const input_fields = {
    username: /^[a-z\d]{5,12}$/i,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]+)(\.[a-z]{2,8})?$/,
    password: /^[#\w@_-]{8,20}$/,
    telephone: /^\d{10}$/,
  };
  
  const validate = (field, regex) => {
    regex.test(field.value)
      ? (field.className = "valid")
      : (field.className = "invalid");
  };
  
  let keys = document.querySelectorAll(".input-login");
  keys.forEach((item) =>
    item.addEventListener("keyup", (e) => {
      validate(e.target, input_fields[e.target.attributes.name.value]);
    })
  );