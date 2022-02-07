import { render, screen } from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";

import Home from "./Home/Home";

test('renders learn react link', () => {
  render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>);
  const linkElement = screen.getByText(/Quiz Manager/i);
  expect(linkElement).toBeInTheDocument();
});
