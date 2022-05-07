import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  render,
  screen,
  within,
  fireEvent,
} from '@testing-library/react';

// import { useAlert } from 'react-alert';
import store from '@services/redux/store';
import Application from '@pages/order-unpaid/Screen';

describe('get order unpaid', () => {
  const history = createMemoryHistory();

  beforeAll(() => {
    history.push('/order-unpaid');
  });

  afterEach(() => {
    history.push('/order-unpaid');
  });

  it('should have card header with label "Informasi Produk"', () => {
    //
  });

  it('should have card body with list card of order', () => {
    //
  });

  it('should have footer that containing pagination', () => {
    //
  });

  it('should each the response of array when http status code 200', () => {
    //
  });

  it('should show an error alert when http status code not 200', () => {
    //
  });

  it('list card of order should have card header with label "Order ID"', () => {
    //
  });

  it('list card of order should have card body with order info -> product image', () => {
    //
  });

  it('list card of order should have card body with order info -> product name, order quantity, and total price', () => {
    //
  });

  it('list card of order should have card body with order info -> total price', () => {
    //
  });

  it('list card of order should have card body and containing button order detail', () => {
    //
  });

  it('list card of order should have card footer and containing total price', () => {
    //
  });

  it('button order detail in list card of order should clickable', () => {
    //
  });

  it('button order detail in list card of order should redirect to url /order-detail/:id', () => {
    //
  });
});
