document.addEventListener('DOMContentLoaded', () => {
    const recsDiv = document.getElementById('recs');
    const rightSection = document.querySelector('#right');
    const totalSection = document.querySelector('.total h4');

    recsDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('dish')) {
            const dishName = event.target.textContent;
            let priceElement = event.target.nextElementSibling;

            if (!priceElement || !priceElement.classList.contains('price')) {
                return;
            }

            let priceText = priceElement.textContent.trim();
            let priceOptions = priceText.match(/\$\d+(\.\d{1,2})?/g); // Extract all prices
            let selectedPrice;

            if (priceOptions.length > 1) {
                selectedPrice = prompt(`Choose a price for ${dishName}:\n${priceOptions.join(' | ')}`, priceOptions[0]);
                if (!selectedPrice || !priceOptions.includes(selectedPrice)) {
                    alert("Invalid selection!");
                    return;
                }
            } else {
                selectedPrice = priceOptions[0];
            }

            const dishContainer = document.createElement('div');
            dishContainer.classList.add('selected-dish');

            const dishCopy = document.createElement('p');
            dishCopy.textContent = `${dishName} - ${selectedPrice}`;
            dishContainer.appendChild(dishCopy);

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = 1;
            quantityInput.min = 1;
            dishContainer.appendChild(quantityInput);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                rightSection.removeChild(dishContainer);
                updateTotal();
            });
            dishContainer.appendChild(removeButton);

            rightSection.appendChild(dishContainer);
            updateTotal();

            quantityInput.addEventListener('change', updateTotal);
        }
    });


    function updateTotal() {
        let total = 0;
        rightSection.querySelectorAll('.selected-dish').forEach(dishContainer => {
            const priceText = dishContainer.querySelector('p').textContent;
            const price = parseFloat(priceText.match(/\d+(\.\d{1,2})?/)[0]); // Extract price
            const quantity = parseInt(dishContainer.querySelector('input').value, 10);
            total += price * quantity;
        });
        totalSection.textContent = `TOTAL: $${total.toFixed(2)}`;
    }
});
