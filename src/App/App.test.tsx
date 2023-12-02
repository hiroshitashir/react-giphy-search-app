import React from 'react';
import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';

import { App, gifyService }from './App';
import resObj from '../../test_data/giphy_sample_res.json'
import { GifsResult } from '@giphy/js-fetch-api';


let mockSearchGIFs: jest.SpyInstance;
const customSearchGIFs = async ():Promise<GifsResult> => {
  return resObj as unknown as GifsResult 
}

beforeEach(() => {
  mockSearchGIFs = jest.spyOn(gifyService, 'searchGIFs').mockImplementation(customSearchGIFs);
});

afterEach(() => {
  mockSearchGIFs.mockRestore()
  cleanup()
});

test('initial render', () => {
  render(<App />)

  const titleElement = screen.getByText(/GIFs Search/i)
  expect(titleElement).toBeInTheDocument()

  const inputElement = screen.getByPlaceholderText(/Search GIFs/i)
  expect(inputElement).toBeInTheDocument()

  const buttonElement = screen.getByText("Search")
  expect(buttonElement).toBeInTheDocument()
})

test('search with empty keyword', async () => {
  render(<App />)

  const buttonElement = screen.getByText("Search")
  fireEvent.click(buttonElement)

  await waitFor(() => {
    expect(screen.queryByTestId("grid-giphy-image")).toBeNull();
  });
});

test('search with keyword "Orange"', async () => {
  render(<App />)

  const inputElement = screen.getByPlaceholderText(/Search GIFs/i) satisfies HTMLInputElement
  fireEvent.change(inputElement, { target: { value: "Orange" }})
  expect(inputElement.value).toBe("Orange")

  const buttonElement = screen.getByText("Search")
  fireEvent.click(buttonElement)

  await waitFor(() => {
    expect(screen.queryByTestId("grid-giphy-image")).toBeInTheDocument();
  });
});