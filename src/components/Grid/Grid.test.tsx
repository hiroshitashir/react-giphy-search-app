import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { GifsResult } from '@giphy/js-fetch-api'

import Grid from './Grid';
import resObj from '../../../test_data/giphy_sample_res.json'


afterEach(cleanup);

test('renders empty data', () => {
  render(<Grid result={undefined}/>)
  const imageElement = screen.queryByTestId("grid-giphy-image")
  expect(imageElement).toBeNull()
});

test('renders sample response data', () => {
  render(<Grid result={resObj as unknown as GifsResult}/>)
  const imageElement = screen.queryByTestId("grid-giphy-image")
  expect(imageElement).toBeInTheDocument()
});
