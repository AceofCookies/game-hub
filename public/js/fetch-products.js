const productsUrl = "https://steffen-elsker-skole.com/gamehub-headless-cms/wp-json/wc/store/products";

/**
 * Fetches products from the headless CMS
 */
async function fetchProducts() {
  const result = await fetch(productsUrl);
  const products = await result.json();

  return products;
}

$(async () => {
  if (window.location.pathname == "/all-games.html") {
    const products = await fetchProducts();

    $(".game-list").empty();

    const gameList = document.querySelector(".game-list");

    for (const product of products) {
      const newGame = document.createElement("a");
      newGame.classList.add('game-list-item');
      newGame.setAttribute("href", "game-details.html");

      const originalPrice = Number(product.prices.regular_price);
      const salePrice = Number(product.prices.sale_price);

      const percentage = Math.round((1-(salePrice / originalPrice)) * 100);

      newGame.innerHTML = `
        <div>
          <img
            src="${product.images[0].thumbnail}"
            alt="${product.images[0].alt}"
          />
        </div>
        <div class="game-description">
          <h3>${product.name}</h3>
          ${product.short_description}
        </div>
        <div class="game-discount-and-price">
          <div class="game-discount">${percentage}%</div>
          <div class="game-price">${product.prices.price} kr</div>
        </div>
      `;

      gameList.appendChild(newGame);

      if (!product.on_sale) {
        newGame.getElementsByClassName("game-discount")[0].remove();
      }
    }
  }
});
