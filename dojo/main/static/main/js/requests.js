const API_KEY = "CG-FvLp969HaysSXpqZDHsDuEy3";


//  FROM COINGECKO API --------------------------------------------------------------------------------

// get specific info about cryptocurrency
function getCryptoInfo(info, symbol) {
  const apiKey = 'API_KEY'; // Replace with your actual CoinGecko API key
  const apiUrl = `https://api.coingecko.com/api/v3/coins/${symbol}`;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', apiUrl, true);
  xhr.setRequestHeader('Authorization', `Bearer ${apiKey}`);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      if (data[info] !== undefined) {
        console.log(data[info]);
      } else {
        console.log(`"${info}" not found in the response.`);
      }
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      console.error('Error fetching data:', xhr.status);
    }
  };

  xhr.send();
}


// return a list of all cryptocurrencies
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


// using local API ------------------------------------------------------------------------------------

function getUserPortfolio() {
  var portfolio_table = document.getElementById("portfolio_table")

  fetch('/api/get_user_portfolio/')
    .then(response => response.json())
    .then(portfolio => {
      console.log(portfolio);
      var total = 0
      portfolio.forEach(item => {
        portfolio_table.innerHTML += `
        <tr>
          <td><image src="${getCryptoInfo("image", item.cryptocurrency)}" width="20px" height="20px" /></td>
          <td> ${item.cryptocurrency} (${getCryptoInfo("name", item.cryptocurrency)}) </td>
          <td> ${item.quantity} </td>
          <td> ${item.value} </td>
        </tr>
        `
        total = total + item.value;
      })
      portfolio_table.innerHTML += `
      <tr>
        <td colspan="3">Total</td>
        <td> ${total} </td>
      </tr>
      `
    });
}

// sell crypto
function sellCrypto() {
  var crypto = document.getElementById("crypto").value;
  var amount = document.getElementById("amount").value;
  var value = getCryptoInfo("current_price", crypto) * amount;

  fetch('/api/sell_crypto/' + crypto + '/' + amount + '/' + value)
  .then(response => response.json())
  .then(message => {
    console.log(message)
  })
}

// buy crypto
function buyCrypto() {
  var crypto = document.getElementById("crypto").value;
  var amount = document.getElementById("amount").value;
  var value = getCryptoInfo("current_price", crypto) * amount;

  fetch('/api/sell_crypto/' + crypto + '/' + amount + '/' + value)
  .then(response => response.json())
  .then(message => {
    console.log(message)
  })
}