import {fixDecimalPoints, splitStringInTwo} from './utils';

const MAX_MID_PRICES_COUNT = 30;

class CurrencyPair {
  constructor(data) {
    for (let key in data) {
      this[key] = data[key];
    }

    this.midPrices = [(data.bestBid + data.bestAsk) / 2];
  }

  update(data) {
    Object.assign(this, data);
    this.setMidPrices();
  }

  setMidPrices() {
    const newMidPrice = (this.bestBid + this.bestAsk) / 2;
    this.midPrices = [...(this.midPrices.slice(-(MAX_MID_PRICES_COUNT - 1))), newMidPrice];
  }

  render() {
    const createStyledTableData = (value) => {
      return `<td class=value--${value > 0 ? 'positive' : 'negative'}>
                ${value > 0 ? '+' : '-'}${Math.abs(fixDecimalPoints(value))}
              </td>`
    };

    return `<tr>
              <td>${splitStringInTwo(this.name)}</td>
              <td>${fixDecimalPoints(this.bestBid)}</td>
              <td>${fixDecimalPoints(this.bestAsk)}</td>
              <td>${fixDecimalPoints(this.openBid)}</td>
              <td>${fixDecimalPoints(this.openAsk)}</td>
              ${createStyledTableData(this.lastChangeBid)}
              ${createStyledTableData(this.lastChangeAsk)}
              <td><span id='sparkLine_${this.name}'></span></td>
            </tr>`
  }
}

export default CurrencyPair;