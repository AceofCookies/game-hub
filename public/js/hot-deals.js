
HOT_DEAL_LINK_CONTAINERS = document.querySelectorAll("#hot-deals .game-links")
FORWARD_TO = "checkout.html";

HOT_DEAL_LINK_CONTAINERS.forEach(container => {
  let addToCart = container.firstElementChild;
  let buyNow = addToCart.nextElementSibling;

  let handler = (e) => {
    // Stops the parent link from being clicked
    e.preventDefault();

    window.location = FORWARD_TO;
  };

  addToCart.addEventListener("click", handler);
  buyNow.addEventListener("click", handler);
});
