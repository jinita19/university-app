/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

//@ts-ignore
global.TextEncoder = TextEncoder;

//@ts-ignore
global.TextDecoder = TextDecoder;
