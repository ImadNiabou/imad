document.addEventListener("DOMContentLoaded", () => {
  // about
  // See more button
  let hideText__btn = document.getElementById("hideText__btn");
  let hideText = document.getElementById("hideText");
  if (hideText__btn) {
    hideText__btn.addEventListener("click", toggleText);
  }

  function toggleText(ev) {
    ev.preventDefault();
    hideText.classList.toggle("show");

    if (hideText.classList.contains("show")) {
      hideText__btn.innerHTML = "see less";
    } else {
      hideText__btn.innerHTML = "see more";
    }
  }

  // watches
  // cartTab
  let listProductHTML = document.querySelector(".listProduct");
  let listCartHTML = document.querySelector(".listCart");
  let iconCart = document.querySelector(".icon-cart");
  let iconCartSpan = document.querySelector(".icon-cart span");
  let body = document.querySelector("body");
  let closeCart = document.querySelector(".close");
  let products = [];
  let cart = [];

  iconCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });
  closeCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });

  const addDataToHTML = () => {
    // remove datas default from HTML

    // add new datas
    if (products.length > 0) {
      // if has data
      products.forEach((product) => {
        let newProduct = document.createElement("div");
        newProduct.dataset.id = product.id;
        newProduct.classList.add("item");
        newProduct.innerHTML = `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <a class='enlace-producto' href="${product.site}" target="_blank">Official website</a>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
        listProductHTML.appendChild(newProduct);
      });
    }
  };
  listProductHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains("addCart")) {
      let id_product = positionClick.parentElement.dataset.id;
      addToCart(id_product);
    }
  });

  // cart
  const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex(
      (value) => value.product_id == product_id
    );
    if (cart.length <= 0) {
      cart = [
        {
          product_id: product_id,
          quantity: 1,
        },
      ];
    } else if (positionThisProductInCart < 0) {
      cart.push({
        product_id: product_id,
        quantity: 1,
      });
    } else {
      cart[positionThisProductInCart].quantity =
        cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
  };
  const addCartToMemory = () => {
    // convert array to json
    localStorage.setItem("cart", JSON.stringify(cart));
  };
  const addCartToHTML = () => {
    listCartHTML.innerHTML = "";
    let totalQuantity = 0;
    let subtotal = 0;
    let totalCart = 0;
    if (cart.length > 0) {
      cart.forEach((item) => {
        totalQuantity = totalQuantity + item.quantity;

        let newItem = document.createElement("div");
        newItem.classList.add("item");
        newItem.dataset.id = item.product_id;

        let positionProduct = products.findIndex(
          (value) => value.id == item.product_id
        );

        let info = products[positionProduct];

        subtotal = info.price * item.quantity;
        totalCart = totalCart + subtotal;

        // totalCart = totalCart + info.price;
        console.log(totalCart);
        listCartHTML.appendChild(newItem);
        newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${subtotal}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
      });

      /* Add total */
      /* console.log(totalCart); */
      let divTotal = document.createElement("div");
      divTotal.innerHTML = `
      <div class="cartTotal">
         Total: $${totalCart}
      </div>
      `;
      listCartHTML.appendChild(divTotal);
    }
    iconCartSpan.innerText = totalQuantity;
  };

  listCartHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (
      positionClick.classList.contains("minus") ||
      positionClick.classList.contains("plus")
    ) {
      let product_id = positionClick.parentElement.parentElement.dataset.id;
      let type = "minus";
      if (positionClick.classList.contains("plus")) {
        type = "plus";
      }
      changeQuantityCart(product_id, type);
    }
  });
  const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex(
      (value) => value.product_id === product_id
    );
    if (positionItemInCart >= 0) {
      let info = cart[positionItemInCart];
      switch (type) {
        case "plus":
          cart[positionItemInCart].quantity =
            cart[positionItemInCart].quantity + 1;
          break;

        default:
          let changeQuantity = cart[positionItemInCart].quantity - 1;
          if (changeQuantity > 0) {
            cart[positionItemInCart].quantity = changeQuantity;
          } else {
            cart.splice(positionItemInCart, 1);
          }
          break;
      }
    }
    addCartToHTML();
    addCartToMemory();
  };

  const initApp = () => {
    // fetch get product
    fetch("products.json")
      .then((response) => response.json())
      .then((data) => {
        products = data;
        addDataToHTML();

        // local storage save cart status
        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"));
          addCartToHTML();
        }
      });
  };
  initApp();
  
});
