const API_KEY = "CG-FvLp969HaysSXpqZDHsDuEy3";

function displayAll() {
  var displaySpace = document.getElementById("display_space");
  var xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`,
    true
  );
  xhr.setRequestHeader("X-CMC_PRO_API_KEY", API_KEY);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const currencies = JSON.parse(xhr.responseText);
      currencies.forEach((currency) => {
        displaySpace.innerHTML += `
            <tr>
                <td><img src="${currency.image}" width="20px" height="20px"/></td>
                <td class="symbol_col">${currency.symbol}</td>
                <td>${currency.name}</td>
                <td>${currency.current_price}</td>
                <td>${currency.price_change_percentage_24h}</td>
                <td><button class="btn btn-outline-light">Buy</button></td>
            </tr>
            `;
      });
    } else {
      console.error("Request failed with status:", xhr.status);
    }
  };

  xhr.send();
}

displayAll();
