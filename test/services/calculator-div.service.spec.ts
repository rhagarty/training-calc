import {Container} from 'typescript-ioc';
import {Errors} from 'typescript-rest';

import {CalculatorDivService} from '../../src/services';
import {ApiServer} from '../../src/server';
import {buildApiServer} from '../helper';
import {server} from '../../src/mocks/testServer';

describe('Calculator Divide service', () =>{

  let app: ApiServer;
  let service: CalculatorDivService;
  beforeAll(() => {
    app = buildApiServer();
    service = Container.get(CalculatorDivService);
    server.listen();
  });

  afterAll(() => { server.close() });
  afterEach(() => { server.resetHandlers() });

  test('canary test verifies test infrastructure', () => {
    expect(service).not.toBeUndefined();
  });

  describe('Given div()', () => {
    context('when "LX, III, II" provided', () => {
      const value = 'LX, III, II';
      test('then return "X"', async () => {
        expect(await service.divide(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "X"});
      });
    });

    context('when "X,V,I" provided', () => {
      const value = 'X,V,I';
      test('then return "II"', async () => {
        expect(await service.divide(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "II"});
      });
    });

    context('when "X" provided', () => {
      const value = 'X';
      test('then return "X"', async () => {
        expect(await service.divide(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "X"});
      });
    });

    context('when "XX, II, III" provided', () => {
      const value = 'XX, II, III';
      test('then return "III"', async () => {
        expect(await service.divide(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "III"});
      });
    });

    context('when "XIX, III, II" provided', () => {
      const value = 'XIX, III, II';
      test('then return "III"', async () => {
        expect(await service.divide(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "III"});
      });
    });

    context('when "XX, III, II" provided', () => {
      const value = 'XX, III, II';
      test('then return "III"', async () => {
        expect(await service.divide(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": "III"});
      });
    });

    context('when "MMMM,XX,I" provided', () => {
      const value = 'MMMM,XX,I';
      test('then return "ERROR - invalid roman numeral"', async () => {
        expect(await service.divide(value)).toEqual(
          {"errorString": 'ERROR - invalid roman numeral', 
           "errorType": Errors.BadRequestError, 
           "isValid": false, 
           "result": ''});
      });
    });

    context('when "V,XX,I" provided', () => {
      const value = 'V,XX,I';
      test('then return "nulla"', async () => {
        expect(await service.divide(value)).toEqual(
          {"errorString": undefined, 
           "errorType": undefined, 
           "isValid": true, 
           "result": 'nulla'});
      });
    });

  });
});
