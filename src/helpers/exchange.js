import _ from 'lodash';

export function getMarkets() {
  const data = [
    {id: 'PRED', token: 'PRED/RUNES', price: '0.2', vol: '5', chg: '2000', name: 'Prediction Token', favorite: 0},
    {id: 'FUN', token: 'FUN/RUNES', price: '2', vol: '3', chg: '3000', name: 'Fun Token', favorite: 0},
    {id: 'RRC223', token: 'RRC223/RUNES', price: '2', vol: '4', chg: '50', name: 'RRC223 Token', favorite: 0},
    {id: 'GOB', token: 'GOB/RUNES', price: '2', vol: '2', chg: '10', name: 'GOB Token', favorite: 1},
  ]; 
  return data;
}
