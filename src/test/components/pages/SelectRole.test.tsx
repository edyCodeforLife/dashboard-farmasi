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

import store from '@services/redux/store';
import Application from '@pages/select-role/Screen';

describe('selecting role before login', () => {
  it('should render aswel and have 2 type of roles (Mika & Alteacare)', () => {
    render(
      <Provider store={store}>
        <Application />
      </Provider>,
    );

    const alteaRole = within(screen.getByTestId('altea')).getByText;
    const mikaRole = within(screen.getByTestId('mika')).getByText;
    expect(mikaRole('RS Mitra Keluarga')).toBeInTheDocument();
    expect(alteaRole('AlteaCare')).toBeInTheDocument();
  });

  it('should have 2 roles and it should button type', () => {
    render(
      <Provider store={store}>
        <Application />
      </Provider>,
    );

    const button = screen.getAllByRole('button');
    expect(button.length).toBe(2);
  });

  it('should clickable button, redirect to login url and saved role in local storage', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Application />
        </Router>
      </Provider>,
    );

    const buttonRoleMika = screen.getByTestId('btn-role-mika');
    fireEvent.click(buttonRoleMika);

    expect(history.location.pathname).toBe('/login');
    expect(localStorage.getItem('role')).toBe('MIKA_PHARMACY');
  });
});
