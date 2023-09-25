const cryptoSelect = document.getElementById('crypto-select');
const cryptoPrice = document.getElementById('crypto-price');
const alertPriceInput = document.getElementById('alert-price');
const alertMessage = document.getElementById('alert-message');

let alertPrice = null;

alertPriceInput.addEventListener('change', () => {
    alertPrice = parseFloat(alertPriceInput.value);
});

async function getCryptoList() {
    try {
        const response = await fetch('https://api.coinlore.net/api/tickers/');
        const data = await response.json();
        data.data.slice(0, 50).forEach(coin => {
            const option = document.createElement('option');
            option.value = coin.id;
            option.textContent = coin.name;
            cryptoSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching the crypto list:", error);
    }
}


async function getCryptoPrice(cryptoId) {
    try {
        const response = await fetch(`https://api.coinlore.net/api/ticker/?id=${cryptoId}`);
        const data = await response.json();
        const currentPrice = data[0].price_usd;
        cryptoPrice.textContent = parseFloat(currentPrice).toFixed(2);

        if (alertPrice && parseFloat(currentPrice) >= alertPrice) {
            alertMessage.textContent = `Alert: ${cryptoSelect.options[cryptoSelect.selectedIndex].text} has reached or surpassed $${alertPrice}`;
            alertMessage.style.display = "block";
        } else {
            alertMessage.style.display = "none";
        }

    } catch (error) {
        console.error("Error fetching the crypto price:", error);
    }
}

cryptoSelect.addEventListener('change', (e) => {
    getCryptoPrice(e.target.value);
});

getCryptoList();
