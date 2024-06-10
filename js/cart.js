document.addEventListener("DOMContentLoaded", function () {
  var products = document.querySelectorAll(".cart--product");

  function formatCurrency(number) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
  }

  function calculateTotalPayment() {
    let totalPayment = 0;
    products.forEach(function (product) {
      const totalText = product.querySelector(".total b").textContent;
      const totalValue = parseInt(totalText.replace(/[^\d]/g, "")); // Remove any non-numeric characters
      totalPayment += totalValue;
    });
    document.querySelector(
      ".pay strong"
    ).textContent = `Tổng Thanh Toán : ${formatCurrency(totalPayment)}`;
  }

  function updateTotal(product) {
    const price = parseInt(product.getAttribute("data-price"));
    const quantity = parseInt(
      product.querySelector(".btn--cart__number").textContent
    );
    const total = price * quantity;
    const totalFormatted = total.toLocaleString("vi-VN") + "₫";
    product.querySelector(".total b").textContent = `Tổng: ${totalFormatted}`;

    // Update total payment
    calculateTotalPayment();
  }

  products.forEach(function (product) {
    product.addEventListener("click", function (event) {
      if (event.target.classList.contains("btn--cart-decrease")) {
        const numberDisplay = event.target.nextElementSibling;
        let currentNumber = parseInt(numberDisplay.textContent);
        if (currentNumber > 1) {
          numberDisplay.textContent = currentNumber - 1;
          updateTotal(product);
        }
      } else if (event.target.classList.contains("btn--cart-increase")) {
        const numberDisplay = event.target.previousElementSibling;
        let currentNumber = parseInt(numberDisplay.textContent);
        if (currentNumber < 10) {
          numberDisplay.textContent = currentNumber + 1;
        } else {
          alert("Bạn không thể mua quá 10 sản phẩm");
        }
        updateTotal(product);
      } else if (event.target.closest(".btn--delete button")) {
        product.remove();
        calculateTotalPayment();
      }
    });

    // Initialize total value for each product
    updateTotal(product);
  });

  // Initialize total payment
  calculateTotalPayment();
});
