import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import api from '../services/api';

const apiMock = new MockAdapter(api);

import App from '../App';

const wait = (amount = 0) => new Promise((resolve) => setTimeout(resolve, amount));

const actWait = async (amount = 0) => {
  await act(async () => {
    await wait(amount);
  });
};

describe('App component', () => {
  it('should be able to add new repository', async () => {
    const { getByText, getByTestId } = render(<App />);
    apiMock.onGet('repositories').reply(200, []);

    apiMock.onPost('repositories').reply(200, {
      id: '123',
      url: 'https://github.com/josepholiveira',
      title: 'Desafio ReactJS',
      techs: ['React', 'Node.js'],
    });

    await actWait();

    fireEvent.click(getByText('Add'));

    await actWait();

    expect(getByTestId('repository-list')).toContainElement(getByText('Desafio ReactJS'));
  });

  it('should be able to list repositories', async () => {
    const { getByText, getByTestId } = render(<App />);
    apiMock.onGet('repositories').reply(200, [
      {
        id: '1',
        url: 'https://github.com/josepholiveira',
        title: 'Repository 1',
        techs: ['React', 'Node.js'],
      },
      {
        id: '2',
        url: 'https://github.com/josepholiveira',
        title: 'Repository 2',
        techs: ['React', 'Node.js'],
      },
    ]);

    await actWait();

    const ulElem = getByTestId('repository-list');
    
    // The ul should contain 2 elements (Repository 1 and Repository 2)
    expect(ulElem.children.length).toBe(2);
    
    // The li should include both items
    expect(ulElem).toContainElement(getByText('Repository 1'));
    expect(ulElem).toContainElement(getByText('Repository 2'));
  });

  it('should be able to remove repository', async () => {
    const { getByText, getByTestId } = render(<App />);

    apiMock.onGet('repositories').reply(200, [
      {
        id: '123',
        url: 'https://github.com/josepholiveira',
        title: 'Desafio ReactJS',
        techs: ['React', 'Node.js'],
      },
    ]);

    apiMock.onDelete('repositories/123').reply(204);

    await actWait();

    fireEvent.click(getByText('Remove'));

    await actWait();

    expect(getByTestId('repository-list')).toBeEmpty();
  });
});
