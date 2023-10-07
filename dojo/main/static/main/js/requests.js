const API_KEY = "CG-FvLp969HaysSXpqZDHsDuEy3";


//  FROM COINGECKO API --------------------------------------------------------------------------------

function getCryptoInfo(properties, symbol) {
  return new Promise((resolve, reject) => {
    const apiKey = API_KEY; // Replace with your actual CoinGecko API key
    const apiUrl = `https://api.coingecko.com/api/v3/coins/${symbol}`;

    const xhr = new XMLHttpRequest();

    xhr.open('GET', apiUrl, true);
    xhr.setRequestHeader('Authorization', `Bearer ${apiKey}`);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.responseText);

          // Navigate through properties array
          let currentObj = data;
          for (const property of properties) {
            if (currentObj[property] !== undefined) {
              currentObj = currentObj[property];
            } else {
              reject(`"${property}" not found in the response.`);
              return;
            }
          }

          resolve(currentObj);
        } else {
          reject('Error fetching data:', xhr.status);
        }
      }
    };

    xhr.send();
  });
}




// return the list of all cryptocurrencies
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
                <td>${currency.current_price}USDT</td>
                <td>${currency.price_change_percentage_24h}%</td>
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





// display the list for dropdown menu
function displayCryptoOptions() {
  var crypto_dropdown = document.getElementById("crypto_dropdown");
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
        crypto_dropdown.innerHTML += `
          <option value="${currency.id}" style="background-image:url(${currency.image});">
            ${currency.name}
          </option>
        `
      })
    } else {
      console.error("Request failed with status:", xhr.status);
    }
  };
  xhr.send();
}
displayCryptoOptions()




// using local API ------------------------------------------------------------------------------------

async function getUserPortfolio() {
  var portfolio_table = document.getElementById("portfolio_table");

  try {
    const response = await fetch('/api/get_user_portfolio');
    const portfolio = await response.json();

    console.log(portfolio);
    var total = 0;

    // Define a function to get crypto info for an item
    async function getCryptoInfoForItem(item) {
      const price = await getCryptoInfo(["market_data", "current_price", "usd"], item.cryptocurrency);
      const name = await getCryptoInfo(["name"], item.cryptocurrency);
      const image = await getCryptoInfo(["image", "thumb"], item.cryptocurrency);
      const symbol = await getCryptoInfo(["symbol"], item.cryptocurrency)

      return { price, name, image, symbol };
    }

    // Fetch crypto info for each item in the portfolio
    const cryptoInfoList = await Promise.all(portfolio.map(getCryptoInfoForItem));

    cryptoInfoList.forEach((cryptoInfo, index) => {
      const item = portfolio[index];
      var value = (item.quantity * cryptoInfo.price).toFixed(2); // Limit to 2 decimal places

      portfolio_table.innerHTML += `
        <tr>
          <td><img src="${cryptoInfo.image}" width="20px" height="20px" /></td>
          <td> ${cryptoInfo.symbol.toUpperCase()} (${cryptoInfo.name}) </td>
          <td> ${item.quantity} </td>
          <td> ${value} </td>
        </tr>
      `;

      total += parseFloat(value); // Update the total, ensuring it's a float
    });

    total = total.toFixed(2); // Limit the total to 2 decimal places

    portfolio_table.innerHTML += `
      <tr style="border-top: 1px solid white;">
        <td colspan="3">Total</td>
        <td> ${total} </td>
      </tr>
    `;

    document.getElementById('total_display').innerHTML += total
  } catch (error) {
    console.error(error);
  }
}

getUserPortfolio();

async function showTotal(){

  try {
    const response = await fetch('/api/get_user_portfolio');
    const portfolio = await response.json();

    console.log(portfolio);
    var total = 0;

    // Define a function to get crypto info for an item
    async function getCryptoInfoForItem(item) {
      const price = await getCryptoInfo(["market_data", "current_price", "usd"], item.cryptocurrency);
      const name = await getCryptoInfo(["name"], item.cryptocurrency);

      return { price, name};
    }

    // Fetch crypto info for each item in the portfolio
    const cryptoInfoList = await Promise.all(portfolio.map(getCryptoInfoForItem));

    cryptoInfoList.forEach((cryptoInfo, index) => {
      const item = portfolio[index];
      var value = (item.quantity * cryptoInfo.price).toFixed(2); // Limit to 2 decimal places
      total += parseFloat(value); // Update the total, ensuring it's a float
    });

    total = total.toFixed(2); // Limit the total to 2 decimal places
    document.getElementById('total_display').innerHTML += total
  } catch (error) {
    console.error(error);
  }
}

showTotal()

// sell crypto
async function sellCrypto() {
  var crypto = document.getElementById("crypto_dropdown").value;
  var amount = document.getElementById("quantity").value;

  try {
    const price = await getCryptoInfo(["market_data", "current_price", "usd"], crypto);
    const value = (price * amount).toFixed(2);

    const response = await fetch('/api/sell_crypto/' + crypto + '/' + amount + '/' + value);
    const message = await response.json();

    console.log(message);
    alert(JSON.stringify(message.message))
    location.reload()

  } catch (error) {
    console.error(error);
  }
}

var sellButton = document.getElementById('sell-button');
sellButton.addEventListener("click", sellCrypto);

// buy crypto
async function buyCrypto() {
  var crypto = document.getElementById("crypto_dropdown").value;
  var amount = document.getElementById("quantity").value;

  try {
    const price = await getCryptoInfo(["market_data", "current_price", "usd"], crypto);
    const value = (price * amount).toFixed(2);

    const response = await fetch('/api/buy_crypto/' + crypto + '/' + amount + '/' + value);
    const message = await response.json();

    console.log(message);
    alert(JSON.stringify(message.message))
    location.reload()

  } catch (error) {
    console.error(error);
  }
}

var buyButton = document.getElementById('buy-button');
buyButton.addEventListener("click", buyCrypto);
