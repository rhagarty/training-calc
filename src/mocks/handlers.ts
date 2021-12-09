// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get("*/to-roman", (req, resp, ctx) => {
    const value = req.url.searchParams.get('value');
    console.log('[MOCK] to-roman - value: ' + value);
    let retValue: string;

    // do the num to roman conversion for numbers required by our tests
    if (value === '0') retValue = 'nulla';
    else if (value === '2') retValue = 'II';
    else if (value === '3') retValue = 'III';
    else if (value === '4') retValue = 'IV';
    else if (value === '8') retValue = 'VIII';
    else if (value === '10') retValue = 'X';
    else if (value === '16') retValue = 'XVI';
    else if (value === '22') retValue = 'XXII';
    else if (value === '30') retValue = 'XXX';
    else if (value === '50') retValue = 'L';
    else if (value === '56') retValue = 'LVI';
    else if (value === '88') retValue = 'LXXXVIII';
    else if (value === '300') retValue = 'CCC';
    else if (value === '960') retValue = 'CMLX';
    else if (value === '3300') retValue = 'MMMCCC';
    
    return resp(
      ctx.status(200),
      ctx.body(retValue)
    )
  }),

  rest.get("*/to-number", (req, resp, ctx) => {
    const value = req.url.searchParams.get('value');
    console.log('[MOCK] to-number - value: ' + value);
    let retValue: string;

    // do the roman to num conversion for numbers required by our tests
    if (value === 'I') retValue = '1';
    else if (value === 'II') retValue = '2';
    else if (value === 'III') retValue = '3';
    else if (value === 'V') retValue = '5';
    else if (value === 'X') retValue = '10';
    else if (value === 'XI') retValue = '11';
    else if (value === 'XV') retValue = '15';
    else if (value === 'XIX') retValue = '19';
    else if (value === 'XX') retValue = '20';
    else if (value === 'XXX') retValue = '30';
    else if (value === 'LV') retValue = '55';
    else if (value === 'LX') retValue = '60';
    else if (value === 'M') retValue = '1000';
    else if (value === 'ML') retValue = '1050';
    
    return resp(
      ctx.status(200),
      ctx.body(retValue)
    )
  }),
];
