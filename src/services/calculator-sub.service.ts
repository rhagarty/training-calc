import {CalculatorSubApi} from './calculator-sub.api';
import {Inject} from 'typescript-ioc';
import {LoggerApi} from '../logger';
import {processOperands, OperationTypeSubtract} from '../util/calc-utils';

export class CalculatorSubService implements CalculatorSubApi {
  logger: LoggerApi;

  constructor(
    @Inject
    logger: LoggerApi,
  ) {
    this.logger = logger.child('CalculatorSubService');
  }

  /**
   * Subtract Roman numerals
   * @param params 
   */
  async subtract(params: string = null) {
    this.logger.info(`Subtracting roman numerals: ${params}`);
    return processOperands(params, this.logger, OperationTypeSubtract);
  }
}
