import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  render,
  screen,
  within,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';

import store from '@services/redux/store';
import Application from '@pages/login/Screen';
import AuthenticationMockApi from '@test/services/Authentication.test';

describe('fill up credential in form before login', () => {
  const history = createMemoryHistory();
  const { login } = AuthenticationMockApi();

  beforeAll(() => {
    history.push('/login');
  });

  afterEach(() => {
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    history.push('/login');
  });

  it('should have form', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Application />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-password')).toBeInTheDocument();
  });

  it('should have input type email and input type password', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Application />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('input-email')).toHaveAttribute('type', 'email');
    expect(screen.getByTestId('input-password')).toHaveAttribute('type', 'password');
  });

  it('should have button for submiting the form', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Application />
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('btn-submit')).toHaveAttribute('type', 'button');
  });

  it('should have toggle show password in input type password', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Application />
        </Router>
      </Provider>,
    );

    const toggleBtn = screen
      .getByTestId('input-password') // this test id of password input
      .closest('div') // this wrapper for icon
      .querySelector('div'); // this deep wrapper for icon

    const iconToggle = toggleBtn.querySelector('span').firstChild.nodeValue;

    expect(toggleBtn).toHaveAttribute('role', 'button'); // expectig the div have attribute role
    expect(iconToggle).toBe('visibility_off_icon'); // expecting the icon is correct icon name
  });

  it('should switch to password type or plain type when toggle show password clicked', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Application />
        </Router>
      </Provider>,
    );

    // expect first render this input type is password
    expect(screen.getByTestId('input-password')).toHaveAttribute('type', 'password');

    // get btn toggle component
    const toggleBtn = screen
      .getByTestId('input-password') // this test id of password input
      .closest('div') // this wrapper for icon
      .querySelector('div'); // this deep wrapper for ico

    fireEvent.click(toggleBtn);

    // after click toggle show password we expect this input type is text
    expect(screen.getByTestId('input-password')).toHaveAttribute('type', 'text');
  });

  it('should show an error when API get status code execpt 200 after submit login', async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Application />
        </Router>
      </Provider>,
    );

    const inputEmail = screen.getByTestId('input-email');
    const inputPassword = screen.getByTestId('input-password');
    const btnSubmit = screen.getByTestId('btn-submit');

    fireEvent.change(inputEmail, { target: { value: 'ilham.pratama@alteacare.com' } });
    fireEvent.change(inputPassword, { target: { value: 'Qwerty123' } });
    fireEvent.click(btnSubmit);

    await login({ status: 400, message: 'User Not Registered' }); // call the mock API

    localStorage.setItem('role', 'Alteacares');
    localStorage.setItem('email', inputEmail.value);
    localStorage.setItem('password', inputPassword.value);

    const errorAlert = await screen.findByRole('alert');

    expect(errorAlert).toHaveTextContent('User Not Registered');
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should redirect to "/order-unpaid" when API get status code 200 and role is Alteacare Pharmacy', async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Application />
        </Router>
      </Provider>,
    );

    const inputEmail = screen.getByTestId('input-email');
    const inputPassword = screen.getByTestId('input-password');
    const btnSubmit = screen.getByTestId('btn-submit');

    await waitFor(async () => {
      fireEvent.change(inputEmail, { target: { value: 'ilham.pratama@alteacare.com' } });
      fireEvent.change(inputPassword, { target: { value: 'Qwerty123' } });
      fireEvent.click(btnSubmit);

      await localStorage.setItem('role', 'ALTEA_PHARMACY');
      await localStorage.setItem('email', inputEmail.value);
      await localStorage.setItem('password', inputPassword.value);

      await login({ status: 200, message: 'OK' }); // call the mock API and expect status success

      expect(history.location.pathname).toBe('/order-unpaid');
      expect(localStorage.getItem('role')).toBe('ALTEA_PHARMACY');
    });
  });

  it('should redirect to "/order-processed" when API get status code 200 and role is Mika Pharmacy', async () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Application />
        </Router>
      </Provider>,
    );

    const inputEmail = screen.getByTestId('input-email');
    const inputPassword = screen.getByTestId('input-password');
    const btnSubmit = screen.getByTestId('btn-submit');

    await waitFor(async () => {
      fireEvent.change(inputEmail, { target: { value: 'ilham.pratama@alteacare.com' } });
      fireEvent.change(inputPassword, { target: { value: 'Qwerty123' } });
      fireEvent.click(btnSubmit);

      await localStorage.setItem('role', 'MIKA_PHARMACY');
      await localStorage.setItem('email', inputEmail.value);
      await localStorage.setItem('password', inputPassword.value);

      await login({ status: 200, message: 'OK' }); // call the mock API and expect status success

      expect(localStorage.getItem('role')).toBe('MIKA_PHARMACY');
      expect(history.location.pathname).toMatch('/order-processed');
    });
  });
});
