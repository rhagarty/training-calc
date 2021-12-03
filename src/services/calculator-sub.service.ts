import {CalculatorSubApi} from './calculator-sub.api';
import {Errors} from 'typescript-rest';
import {Inject} from 'typescript-ioc';
import {LoggerApi} from '../logger';
import {CalculatorResult, convertToNumber, convertToRoman, isValid} from '../util/calc-utils';

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
  async subtract(params: string = null): Promise<CalculatorResult> {
    this.logger.info(`Subtracting roman numerals: ${params}`);

    // pull out each roman numeral from string
    let operands = params.split(',');

    // convert each roman numeral operand, keeping a running total
    let total = 0;
    let idx = 0;
    while (idx < operands.length) {
      // remove any spaces
      let operand = operands[idx].replace(/\s/g, '');

      // first check if we have a valid roman numeral
      let validCheckResult = isValid(operand);
      if (!validCheckResult.isValid) {
        let result = new CalculatorResult(false);
        result.errorString = validCheckResult.errorString;
        result.errorType = validCheckResult.errorType;
        // console.log('Error found: ' + JSON.stringify(result, null, 2));
        return result;
      }

      try {
        // wait for call to complete
        let num = await convertToNumber(operand) as number;
        if (idx == 0) {
          // we use the first operand as our base
          total = num;
        } else {
          // then subtract all others
          total = total - num;
        }
      }
      catch (error) {
        console.log(error);
      }
      idx++;
    };

    // console.log('total = ' + total);

    // we can't handle numbers < 0 or > 3999
    if (total < 0 || total > 3999) {
      let result = new CalculatorResult(false);
      result.errorString = 'ERROR - out of range (negative or > 3999)';
      result.errorType = Errors.NotImplementedError;
      // console.log('Error found: ' + JSON.stringify(result, null, 2));
      return result;
    }

    // convert number back to roman numeral
    let roman: string;
    try {
      roman = await convertToRoman(total) as string;
    }
    catch (error) {
      console.log(error);
    }

    let result = new CalculatorResult(true);
    result.result = roman;
    // console.log('Good result: ' + JSON.stringify(result, null, 2));
    return result;
  }
}
