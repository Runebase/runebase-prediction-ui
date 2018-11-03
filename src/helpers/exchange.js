import _ from 'lodash';

export function getMarkets() {
  const data = [
    {id: 'PRED', token: 'PRED/RUNES', price: '0.2', vol: '5', chg: '2000', name: 'Prediction Token'},
    {id: 'FUN', token: 'FUN/RUNES', price: '2', vol: '3', chg: '3000', name: 'Fun Token'},
  ]; 
  return data;
}
