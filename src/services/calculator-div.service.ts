import {CalculatorDivApi} from './calculator-div.api';
import {Inject} from 'typescript-ioc';
import {LoggerApi} from '../logger';
import {processOperands, OperationTypeDivide} from '../util/calc-utils';

export class CalculatorDivService implements CalculatorDivApi {
  logger: LoggerApi;

  constructor(
    @Inject
    logger: LoggerApi,
  ) {
    this.logger = logger.child('CalculatorDivService');
  }

  test(total: number, num: number) {
    total = total + num;
    return total;
  }


  /**
   * Divide Roman numerals
   * @param params 
   */
  async divide(params: string = null) {
    this.logger.info(`Dividing roman numerals: ${params}`);
    return processOperands(params, this.logger, OperationTypeDivide);
  }
}
