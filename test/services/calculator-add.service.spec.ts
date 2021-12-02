import {Container} from 'typescript-ioc';
import {Errors} from 'typescript-rest';

import {CalculatorAddService} from '../../src/services';
import {ApiServer} from '../../src/server';
import {buildApiServer} from '../helper';

describe('Calculator Add service', () =>{

  let app: ApiServer;
  let service: CalculatorAddService;
  beforeAll(() => {
    app = buildApiServer();

    service = Container.get(CalculatorAddService);
  });

  test('canary test verifies test infrastructure', () => {
    expect(service).not.toBeUndefined();
  });

  describe('Given add()', () => {
    context('when "I,I,I" provided', () => {
      const value = 'I,I,I';
      test('then return "III"', async () => {
        expect(await service.add(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "III"});
      });
    });

    context('when "X,V,I" provided', () => {
      const value = 'X,V,I';
      test('then return "XVI"', async () => {
        expect(await service.add(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "XVI"});
      });
    });

    context('when "X" provided', () => {
      const value = 'X';
      test('then return "X"', async () => {
        expect(await service.add(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "X"});
      });
    });

    context('when "XXX,LV,III" provided', () => {
      const value = 'XXX,LV,III';
      test('then return "LXXXVIII"', async () => {
        expect(await service.add(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "LXXXVIII"});
      });
    });

    context('when "X,X,X,X,X" provided', () => {
      const value = 'X,XV,XI,X,X';
      test('then return "LVI"', async () => {
        expect(await service.add(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "LVI"});
      });
    });

    context('when "M,M,M,ML" provided', () => {
      const value = 'M,M,M,ML';
      test('then return "ERROR - out of range (negative or > 3999)"', async () => {
        expect(await service.add(value)).toEqual(
          {"errorString": 'ERROR - out of range (negative or > 3999)', 
           "errorType": Errors.NotImplementedError, 
           "isValid": false, 
           "result": undefined});
      });
    });

  });
});
