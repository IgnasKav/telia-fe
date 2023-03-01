import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import App from '../src/router';
import css from '../src/app.module.scss';

describe('app component', () => {
    it('renders hi', async () => {
        const { container } = render(<App />);
        const text = container.getElementsByClassName(css.app)[0];
        expect(text).toHaveTextContent('Labas');
    });
});
