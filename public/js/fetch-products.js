const productsUrl = "https://steffen-elsker-skole.com/gamehub-headless-cms/wp-json/wc/store/products";

/**
 * Fetches products from the headless CMS
 */
async function fetchProducts(featured = false) {
  let url = productsUrl;

  if (featured) {
    url += "?featured=true";
  }

  const result = await fetch(url);
  const products = await result.json();

  return products;
}

/**
 * Fetches a single product from the headless CMS
 */
async function fetchProduct(id) {
  const result = await fetch(productsUrl + "/" + id)
  return await result.json();
}

/**
 * Gets the game ID from the URL
 */
function getGameID() {
  // https://stackoverflow.com/a/901144/16993949
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  }); 

  return params.id;
}

$(async () => {
  if (window.location.pathname == "/game-details.html") {
    const id = getGameID();
    const game = await fetchProduct(id);

    console.debug(game);

    const title = document.querySelector("h1");
    const gameName = document.querySelector("#game-name");
    const gameDescription = document.querySelector("#game-description");

    title.innerHTML = game.name;
    gameName.innerHTML = game.name;
    gameDescription.innerHTML = game.description;
  }

  if (window.location.pathname == "/all-games.html") {
    const products = await fetchProducts();

    $(".game-list").empty();

    const gameList = document.querySelector(".game-list");

    for (const product of products) {
      const newGame = document.createElement("a");
      newGame.classList.add('game-list-item');
      newGame.setAttribute("href", `game-details.html?id=${product.id}`);

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

      // If the product is not on sale, remove the discount div
      if (!product.on_sale) {
        newGame.getElementsByClassName("game-discount")[0].remove();
      }
    }
  }

  if (
    window.location.pathname == "/" ||
    window.location.pathname == "/index.html"
  ) {
    const featuredProducts = await fetchProducts(true);

    if (featuredProducts.length > 1) {
      console.error(
        "Got more than one featured product, which is not yet supported",
        featuredProducts
      );
    }
    else {
      const product = featuredProducts[0];
      const featuredGame = document.querySelector("#carousel .page-width");

      const tags = product.tags.map((tag) => {
        return tag.name;
      });

      let tagsString = tags.join(", ");

      if (!tagsString) tagsString = "-";

      featuredGame.innerHTML = `
        <div class="game-info">
          <h2>${product.name}</h2>
          ${product.description}
        </div>

        <div class="game-cover">
          <div class="left-arrow"></div>
          <div class="center-column">
            <img
              src="${product.images[0].thumbnail}"
              alt="${product.name}"
            />
            <div class="dots">
              <div class="left-arrow"></div>
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot active"></div>
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="right-arrow"></div>
            </div>
          </div>
          <div class="right-arrow"></div>
        </div>

        <div class="game-specs">
          <dl>
            <dt>Platforms</dt>
            <dd>PC, Playbox</dd>
          </dl>
          <dl>
            <dt>Tags</dt>
            <dd>${tagsString}</dd>
          </dl>
          <dl>
            <dt>Input methods</dt>
            <dd>Mouse & keyboard, Full controller support</dd>
          </dl>
          <dl>
            <dt>Recent reviews</dt>
            <dd>Overwhelmingly positive</dd>
          </dl>
        </div>
      `;
    }
  }
});
