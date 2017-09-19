import CurrencyPair from '../CurrencyPair';

describe('CurrencyPair', () => {
  const data = {
    name: 'eurjpy',
    bestBid: 110.2345678,
    bestAsk: 108.3456789,
    openBid: 111.1234567,
    openAsk: 109.4567890,
    lastChangeBid: 1.3423456,
    lastChangeAsk: -0.3452897
  };
  let currencyPair;

  beforeEach(() => {
    currencyPair = new CurrencyPair(data);
  });

  it('creates a currency pair', () => {
    for (let key in data) {
      expect(currencyPair[key]).toEqual(data[key]);
    }
    expect(currencyPair.midPrices).toEqual([(data.bestBid + data.bestAsk) / 2]);
  });

  describe('update', () => {
    let updatedData;

    beforeEach(() => {
      updatedData = {
        name: 'eurjpy',
        bestBid: 115.2345678,
        bestAsk: 112.3456789,
        openBid: 116.1234567,
        openAsk: 110.4567890,
        lastChangeBid: 2.3423456,
        lastChangeAsk: -1.3452897
      };
    });

    describe('when mid prices length is less than 30', () => {
      it('updates the currency pair and add the new mid price at the end', () => {
        currencyPair.update(updatedData);

        for (let key in data) {
          expect(currencyPair[key]).toEqual(updatedData[key]);
        }
        expect(currencyPair.midPrices).toEqual([(data.bestBid + data.bestAsk) / 2, (updatedData.bestBid + updatedData.bestAsk) / 2]);
      });
    });

    describe('when mid prices length is equal to 30', () => {
      it('updates the currency pair and remove the first mid price and add the new mid price at the end', () => {
        currencyPair.midPrices = [];
        let i = 1;
        while (i <= 30) {
          currencyPair.midPrices.push(i++);
        }

        currencyPair.update(updatedData);

        const updatedMidPrices = [];
        let j = 2;
        while (j <= 30) {
          updatedMidPrices.push(j++);
        }

        expect(currencyPair.midPrices).toEqual([...updatedMidPrices, (updatedData.bestBid + updatedData.bestAsk) / 2]);
      });
    });
  });

  it('renders the currency pair row', () => {
    const expectedRow = `<tr>
              <td>EUR - JPY</td>
              <td>110.2346</td>
              <td>108.3457</td>
              <td>111.1235</td>
              <td>109.4568</td>
              <td class=value--positive>
                +1.3423
              </td>
              <td class=value--negative>
                -0.3453
              </td>
              <td><span id='sparkLine_eurjpy'></span></td>
            </tr>`;

    expect(currencyPair.render()).toEqual(expectedRow);
  });
});