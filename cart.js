var heartIcons = document.querySelectorAll(".fa-regular");
var clearCart = document.querySelector(".fa-trash");
var cartItems = document.querySelector(".cart_items");
var cartContainer = document.querySelector(".container");
var cartFooter = document.querySelector(".cart_footer");
var removeButtons = document.querySelectorAll(".remove_item");

let isLiked = false;

heartIcons.forEach(function (icon) {
  icon.addEventListener("click", function () {
    isLiked = !isLiked;
    let className;
    if (isLiked === true) {
      className = "fa-solid fa-heart";
    } else {
      className = "fa-regular fa-heart";
    }
    icon.setAttribute("class", className);
  });
});

function clearCartHandler() {
  cartContainer.style.height = "800px";
  cartItems.remove();
  cartFooter.remove();
  var newDiv = document.createElement("div");
  var newH1 = document.createElement("h1");
  newH1.textContent = "Oops! Your cart is empty..";
  newDiv.appendChild(newH1);
  newDiv.classList.add("no_items");
  cartContainer.appendChild(newDiv);
  clearCart.remove();
}
clearCart.addEventListener("click", clearCartHandler);

removeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    button.closest(".item_container").remove();
    if (document.querySelector(".remove_item") === null) {
      clearCartHandler();
    }
  });
});

// INCREMENTS
var incrementButtons = document.querySelectorAll(".increment");

// Function to increment each item quantity
function incrementEachItemQuantity(incrementBtn) {
  var sibling = incrementBtn.nextElementSibling;
  var quantity = parseInt(sibling.textContent);
  quantity = quantity + 1;
  sibling.textContent = quantity.toString();
  return quantity;
}
let pricesArray = [];

function getOriginalPrices(incrementBtn) {
  var priceDiv =
    incrementBtn.nextElementSibling.nextElementSibling.nextElementSibling;
  var priceElement = priceDiv.querySelector("p");
  var individualPrices = priceElement.textContent;
  var individualPricesInt = parseInt(individualPrices.slice(1));
  pricesArray.push(individualPricesInt);

  return pricesArray;
}

function increaseEachItemPrice(quantity, priceArray, index, incrementBtn) {
  var itemPrice = quantity * priceArray[index];
  itemPrice = itemPrice.toFixed(2);
  var itemPriceString = itemPrice.toString();
  itemPriceString = "$" + itemPriceString;
  var priceDiv =
    incrementBtn.nextElementSibling.nextElementSibling.nextElementSibling;
  var priceElement = priceDiv.querySelector("p");
  priceElement.textContent = itemPriceString;
}

// FOR DECREMENT
function decreaseEachItemPrice(quantity, priceArray, index, decrementBtn) {
  var itemPrice = quantity * priceArray[index];
  itemPrice = itemPrice.toFixed(2);
  var itemPriceString = itemPrice.toString();
  itemPriceString = "$" + itemPriceString;
  var priceDiv = decrementBtn.nextElementSibling;
  var priceElement = priceDiv.querySelector("p");
  priceElement.textContent = itemPriceString;
}

for (let i = 0; i < incrementButtons.length; i++) {
  //Getting original prices of each button
  var returnedPricesArray = getOriginalPrices(incrementButtons[i]);
  //   console.log(returnedPricesArray);
  // Adding event listeners for each button
  incrementButtons[i].addEventListener("click", function () {
    //Increment item quantity (function call)
    var quantity = incrementEachItemQuantity(incrementButtons[i]);
    // Function call to update the individual element
    increaseEachItemPrice(
      quantity,
      returnedPricesArray,
      i,
      incrementButtons[i]
    );
    computeTotalPrice();
    computeTotalQuantity();
  });
}

// DECREMENTS
var decrementButtons = document.querySelectorAll(".decrement");

function decrementEachItemQuantity(decrementBtn) {
  var sibling = decrementBtn.previousElementSibling;
  var quantity = parseInt(sibling.textContent);
  if (quantity > 0) {
    quantity = quantity - 1;
    sibling.textContent = quantity.toString();
  }
  return quantity;
}

for (let i = 0; i < decrementButtons.length; i++) {
  //   var returnedPricesArray = getOriginalPrices(decrementButtons[i]);
  decrementButtons[i].addEventListener("click", function () {
    var quantity = decrementEachItemQuantity(decrementButtons[i]);
    decreaseEachItemPrice(quantity, pricesArray, i, decrementButtons[i]);
    computeTotalPrice();
    computeTotalQuantity();
  });
}

//SUBTOTAL FUNCTIONALITY
function computeTotalPrice() {
  let totalPrice = 0;
  var itemPricesElements = document.querySelectorAll(".item_price");

  itemPricesElements.forEach(function (itemPriceElement) {
    var itemPrice = parseFloat(itemPriceElement.textContent.slice(1));

    totalPrice = totalPrice + itemPrice;
  });
  totalPrice = totalPrice.toFixed(2);

  var totalPriceString = "$" + totalPrice.toString();

  var subtotalElement = document.querySelector(".subtotal_price");
  subtotalElement.textContent = totalPriceString;
}

function computeTotalQuantity() {
  let totalQuantity = 0;
  var itemQuantityElements = document.querySelectorAll(".quantity");

  itemQuantityElements.forEach(function (itemQuantityElement) {
    var itemQuantity = parseInt(itemQuantityElement.textContent);
    totalQuantity += itemQuantity;
  });
  var totalQuantityString = totalQuantity.toString();

  var totalQuantityElement = document.querySelector(".total_qty");

  totalQuantityElement.textContent = totalQuantityString;
}
