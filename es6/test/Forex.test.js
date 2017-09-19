import Forex from '../Forex';
import CurrencyPair from '../CurrencyPair';

describe('Forex', () => {
  const row1 = {
      name: 'eurjpy',
      bestBid: 115.2345678,
      bestAsk: 112.3456789
    },
    row2 = {
      name: 'gbpusd',
      bestBid: 118.2345678,
      bestAsk: 117.3456789
    };
  let forex;

  beforeEach(() => {
    spyOn(CurrencyPair.prototype, 'render').and.returnValue('<tr>row</tr>');
    spyOn(CurrencyPair.prototype, 'update');

    forex = new Forex();
  });

  describe('#render', () => {
    it('renders the new currency pair row', () => {
      const currencyRows = forex.render(row1);

      expect(forex.currencyPairs.length).toBe(1);
      expect(CurrencyPair.prototype.render.calls.count()).toBe(1);
      expect(CurrencyPair.prototype.update.calls.any()).toBeFalsy();
      expect(currencyRows).toEqual('<tr>row</tr>');
    });

    it('renders the rows with the updated row', () => {
      forex.currencyPairs = [new CurrencyPair(row1), new CurrencyPair(row2)];

      const updatedRow1 = {
        name: 'eurjpy',
        bestBid: 116.2345678,
        bestAsk: 113.3456789
      };

      const currencyRows = forex.render(updatedRow1);

      expect(forex.currencyPairs.length).toBe(2);
      expect(CurrencyPair.prototype.render.calls.count()).toBe(2);
      expect(CurrencyPair.prototype.update.calls.count()).toBe(1);
      expect(CurrencyPair.prototype.update).toHaveBeenCalledWith(updatedRow1);
      expect(currencyRows).toEqual('<tr>row</tr><tr>row</tr>');
    });
  });
});