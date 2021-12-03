import {CalculatorMultApi} from './calculator-mult.api';
import {Inject} from 'typescript-ioc';
import {LoggerApi} from '../logger';
import {processOperands, OperationTypeMultiply} from '../util/calc-utils';

export class CalculatorMultService implements CalculatorMultApi {
  logger: LoggerApi;

  constructor(
    @Inject
    logger: LoggerApi,
  ) {
    this.logger = logger.child('CalculatorMultService');
  }

  /**
   * Multiply Roman numerals
   * @param params 
   */
  async multiply(params: string = null) {
    this.logger.info(`Multiplying roman numerals: ${params}`);
    return processOperands(params, this.logger, OperationTypeMultiply);
  }
}
