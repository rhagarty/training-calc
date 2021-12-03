import {CalculatorAddApi} from './calculator-add.api';
import {Inject} from 'typescript-ioc';
import {LoggerApi} from '../logger';
import {processOperands, OperationTypeAdd} from '../util/calc-utils';

export class CalculatorAddService implements CalculatorAddApi {
  logger: LoggerApi;

  constructor(
    @Inject
    logger: LoggerApi,
  ) {
    this.logger = logger.child('CalculatorAddService');
  }

  /**
   * Add Roman numerals
   * @param params 
   */
  async add(params: string = null) {
    this.logger.info(`Adding roman numerals: ${params}`);
    return processOperands(params, this.logger, OperationTypeAdd);
  }
}
