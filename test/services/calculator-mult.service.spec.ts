import {Container} from 'typescript-ioc';
import {Errors} from 'typescript-rest';

import {CalculatorMultService} from '../../src/services';
import {ApiServer} from '../../src/server';
import {buildApiServer} from '../helper';

describe('Calculator Multiply service', () =>{

  let app: ApiServer;
  let service: CalculatorMultService;
  beforeAll(() => {
    app = buildApiServer();

    service = Container.get(CalculatorMultService);
  });

  test('canary test verifies test infrastructure', () => {
    expect(service).not.toBeUndefined();
  });

  describe('Given mult()', () => {
    context('when "X,I,I" provided', () => {
      const value = 'X,I,I';
      test('then return "X"', async () => {
        expect(await service.multiply(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "X"});
      });
    });

    context('when "X,V,I" provided', () => {
      const value = 'X,V,I';
      test('then return "L"', async () => {
        expect(await service.multiply(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "L"});
      });
    });

    context('when "X" provided', () => {
      const value = 'X';
      test('then return "X"', async () => {
        expect(await service.multiply(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "X"});
      });
    });

    context('when "LV,XXX,II" provided', () => {
      const value = 'LV,XXX,II';
      test('then return "MMMCCC"', async () => {
        expect(await service.multiply(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "MMMCCC"});
      });
    });

    context('when "I,II,III,V,X" provided', () => {
      const value = 'I,II,III,V,X';
      test('then return "CCC"', async () => {
        expect(await service.multiply(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "CCC"});
      });
    });

    context('when "M,X,I" provided', () => {
      const value = 'M,X,I';
      test('then return "ERROR - out of range (negative or > 3999)"', async () => {
        expect(await service.multiply(value)).toEqual(
          {"errorString": 'ERROR - out of range (negative or > 3999)', 
           "errorType": Errors.NotImplementedError, 
           "isValid": false, 
           "result": undefined});
      });
    });

  });
});
