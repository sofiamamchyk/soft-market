  document.addEventListener('DOMContentLoaded', function() {

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