import {Container} from 'typescript-ioc';
import {Errors} from 'typescript-rest';

import {CalculatorSubService} from '../../src/services';
import {ApiServer} from '../../src/server';
import {buildApiServer} from '../helper';

describe('Calculator Subtract service', () =>{

  let app: ApiServer;
  let service: CalculatorSubService;
  beforeAll(() => {
    app = buildApiServer();

    service = Container.get(CalculatorSubService);
  });

  test('canary test verifies test infrastructure', () => {
    expect(service).not.toBeUndefined();
  });

  describe('Given sub()', () => {
    context('when "X,I,I" provided', () => {
      const value = 'X,I,I';
      test('then return "VIII"', async () => {
        expect(await service.subtract(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "VIII"});
      });
    });

    context('when "X,V,I" provided', () => {
      const value = 'X,V,I';
      test('then return "IV"', async () => {
        expect(await service.subtract(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "IV"});
      });
    });

    context('when "X" provided', () => {
      const value = 'X';
      test('then return "X"', async () => {
        expect(await service.subtract(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "X"});
      });
    });

    context('when "LV,XXX,III" provided', () => {
      const value = 'LV,XXX,III';
      test('then return "XXII"', async () => {
        expect(await service.subtract(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "XXII"});
      });
    });

    context('when "M,X,X,X,X" provided', () => {
      const value = 'M,X,X,X,X';
      test('then return "CMLXI"', async () => {
        expect(await service.subtract(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "CMLX"});
      });
    });

    context('when "V,X,I" provided', () => {
      const value = 'V,X,I';
      test('then return "ERROR - out of range (negative or > 3999)"', async () => {
        expect(await service.subtract(value)).toEqual(
          {"errorString": 'ERROR - out of range (negative or > 3999)', 
           "errorType": Errors.NotImplementedError, 
           "isValid": false, 
           "result": undefined});
      });
    });

  });
});
