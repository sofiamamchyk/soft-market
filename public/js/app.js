function debounce(func, delay) {
  let timeoutId; 

  return function(...args) {
    const context = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => { 
      func.apply(context, args);
    }, delay);
  };
}


document.addEventListener('DOMContentLoaded', function() {

  // Search products
  const searchInput = document.getElementById('search-input');

  const resultsContainer = document.getElementById('search-results');

  function performSearch(query) {
    // resultsContainer.textContent = `Results for: "${query}"`;

    fetch(`/products/search?value=${query}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log(data.products);
        }
      });
  }

  const debouncedSearch = debounce(performSearch, 500);

  // searchInput.addEventListener('input', (event) => {
  //   debouncedSearch(event.target.value);
  // });

  searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (event.target.value) {
        window.location.href = `/search?value=${event.target.value}`;
      }
    }
  });

  // Adds a product to cart
  const cartButtons = document.querySelectorAll('.add-to-cart-btn');

  cartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.dataset.productId;

      fetch(`/cart/add/${productId}`, { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          if (data.success) {

            // Updates cart count in page header
            const cartCountEl = document.getElementById('cart-count');
            cartCountEl.textContent = data.cartCount;
            if (data.cartCount) {
              cartCountEl.classList.remove('hidden');
            } else {
              cartCountEl.classList.add('hidden');
            }

            // Updates current button styles
            button.classList.replace('btn-primary', 'btn-outline-primary');
            button.querySelector('i').classList.replace('bi-cart', 'bi-check2');
            if (button.innerHTML) {
              button.innerHTML = button.innerHTML.replace('Купити', 'В кошику');
            }
          }
        });
    });
  });
});