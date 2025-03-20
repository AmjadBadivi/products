const query = `
{
  products(first: 10) {
    edges {
      node {
        title
        description
        variants(first: 1) {
          edges {
            node {
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
        images(first: 2) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  }
}`;


async function ite() {
  try {
    let goad = await fetch("https://tsodykteststore.myshopify.com/api/2023-01/graphql.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "7e174585a317d187255660745da44cc7"
      },
      body: JSON.stringify({ query })
    });

    const productsContainer = document.getElementById("itemsContainer");
    let loadz = await goad.json();
    console.log(loadz);

    let products = loadz.data.products.edges.slice(1, 9);

    products.forEach(({ node }) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");

      const productTitle = `<h3 class='prodTitle'>${node.title}</h3>`;
      console.log(node);


      let priceInfo = "";
      if (node.variants.edges.length > 0) {
        const variant = node.variants.edges[0].node;
        if (variant.compareAtPrice) {
          priceInfo = `<span class="compare-price">${variant.compareAtPrice.currencyCode} ${variant.compareAtPrice.amount}</span>`;
        }
        priceInfo += `<span class="price">${variant.price.currencyCode} ${variant.price.amount}</span>`;


      }

      let imageOne = "";
      let imageTwo = "";
      let images = ''

      if (node.images.edges.length > 0) {
        imageOne = node.images.edges[0].node.url
        imageTwo = node.images.edges[1].node.url

        images = ` <div class='imageContainer'> <img src="${imageOne}" alt="${'Product Image'}" class='imageFlip' >   
                <img src="${imageTwo}" alt="${'Product Image'}" class='imageFlip'> </div>`


      }

      productDiv.innerHTML = images + productTitle + priceInfo;
      productsContainer.appendChild(productDiv);
    });

  } catch (error) {
    console.error("Error:", error);
  }
}

ite();
