import { render, screen } from '@testing-library/react';
import {MemoryRouter} from "react-router-dom";

import Home from "./Home";

test('renders Quiz Manager title', () => {
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>);
    const textElement = screen.getByText(/Quiz Manager/i);
    expect(textElement).toBeInTheDocument();

    const statusElement = screen.getByText(/Please wait for further development/i);
    expect(statusElement).toBeInTheDocument();
});
