(function () {
  require('./site/index.html');
  require('./site/style.css');
  const Forex = require('./es6/Forex');

  const CLIENT_URL = 'ws://localhost:8011/stomp',
    UPDATED_PRICE_URL = '/fx/prices',
    client = Stomp.client(CLIENT_URL),
    renderingElement = document.getElementById('table-body'),
    forex = new Forex.default();

  client.debug = null;

  client.connect({}, connectCallback, function (error) {
    alert(error.headers.message);
  });

  function connectCallback() {
    client.subscribe(UPDATED_PRICE_URL, (response) => {
      renderingElement.innerHTML = response.body ? forex.render(JSON.parse(response.body)) : '<p>Please check the connection</p>';

      forex.currencyPairs.forEach((currencyPair) => {
        Sparkline.draw(document.getElementById(`sparkLine_${currencyPair.name}`), currencyPair.midPrices, {width: 250});
      });
    });
  }
})();