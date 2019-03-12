#!/bin/sh

echo 'Building mainnet UI at /var/www/runebaseprediction/mainnet'
yarn build --chain=mainnet --output=/var/www/runebaseprediction/mainnet

echo 'Building testnet UI at /var/www/runebaseprediction/testnet'
yarn build --chain=testnet --output=/var/www/runebaseprediction/testnet

echo 'Building regtest UI at /var/www/runebaseprediction/regtest'
yarn build --chain=regtest --output=/var/www/runebaseprediction/regtest
