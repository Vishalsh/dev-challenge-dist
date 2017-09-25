import CurrencyPair from './CurrencyPair';

class Forex {
  constructor() {
    this.currencyPairs = [];
  }

  createCurrencyPair(currencyPairData) {
    const currentCurrencyPair = this.currencyPairs.find((pair) => {
      return pair.name === currencyPairData.name;
    });

    currentCurrencyPair ? currentCurrencyPair.update(currencyPairData) : this.currencyPairs.push(new CurrencyPair(currencyPairData));
  }

  render(currencyPairData) {
    this.createCurrencyPair(currencyPairData);

    return this.currencyPairs.sort((pair1, pair2) => {
      return pair2.lastChangeBid - pair1.lastChangeBid;
    }).reduce((rows, currencyPair) => {
      return rows + currencyPair.render();
    }, '');
  }
}

export default Forex;
