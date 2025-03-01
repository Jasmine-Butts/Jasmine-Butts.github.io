/*
    Filename: cart.js
    Author: Jasmine Butts
    Date: February 28 2025
    Description: This JavaScript file provides interactivity for the shopping cart page.
                 It includes functionalities such as:
                 - Updating item quantities
                 - Calculating total price, including tax and applicable fees
                 - Removing items from the cart
                 - Handling checkout button interactions
    Notes: This file is a prototype and does not currently interact with a backend system.
*/

document.addEventListener("DOMContentLoaded", function () {
    function updateTotals() {
        let subtotal = 0;
        const taxRate = 0.0675; // 6.75% tax

        document.querySelectorAll(".item").forEach((item) => {
            let quantity = parseInt(item.querySelector(".quanitity").value);
            let price = parseFloat(item.querySelector(".price").textContent.replace("$", ""));
            subtotal += quantity * price;
        });

        let tax = subtotal * taxRate;
        let total = subtotal + tax;

        document.getElementById("subtotal").textContent = `Subtotal: $${subtotal.toFixed(2)}`;
        document.getElementById("tax").textContent = `Estimated Tax: $${tax.toFixed(2)}`;
        document.getElementById("total").textContent = `Total: $${total.toFixed(2)}`;
    }

    document.querySelectorAll(".increase").forEach((button) => {
        button.addEventListener("click", function () {
            let quantityInput = this.previousElementSibling;
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateTotals();
        });
    });

    document.querySelectorAll(".decrease").forEach((button) => {
        button.addEventListener("click", function () {
            let quantityInput = this.nextElementSibling;
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
                updateTotals();
            }
        });
    });

    updateTotals(); // Initial calculation on page load
});
