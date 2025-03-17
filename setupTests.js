import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from 'util';
import * as dotenv from 'dotenv';
import ResizeObserver from 'resize-observer-polyfill'

dotenv.config({ path: './.env' });
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
Object.assign(global, { TextDecoder, TextEncoder, ResizeObserver });