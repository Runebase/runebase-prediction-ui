import _ from 'lodash';

export function getMarkets() {
  const data = [
    {id: 'PRED', favorite: 0, token: 'PRED/RUNES', price: '2', vol: '', chg: '2000', name: 'Prediction Token'},
    {id: 'FUN', favorite: 0, token: 'FUN/RUNES', price: '2', vol: '', chg: '3000', name: 'Fun Token'},
    {id: 'RRC223', favorite: 0, token: 'RRC223/RUNES', price: '2', vol: '', chg: '50', name: 'RRC223 Token'},
    {id: 'PRED', favorite: 1, token: 'Gob', price: '2', vol: '', chg: '', name: ''},
  ]; 
  return data;
}

export function tokenChange(event){
  console.log(event);
  switch (event) {
    case 'PRED':
      this.setState({
        token: event,
        balance: _.sumBy(this.props.store.wallet.addresses, ({ pred }) => pred).toFixed(2) || '0.00',
        contractAdress: "1",
        oderstate: 1,
      });
      break;
    case 'FUN':
      this.setState({
        token: event,
        balance: _.sumBy(this.props.store.wallet.addresses, ({ fun }) => fun).toFixed(2) || '0.00',
        contractAdress: "1",
      });
      break;
    default:
      return 'FOO';
  }
}
