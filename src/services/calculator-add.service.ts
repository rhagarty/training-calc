import {CalculatorAddApi} from './calculator-add.api';
import {Errors} from 'typescript-rest';
import {Inject} from 'typescript-ioc';
import {LoggerApi} from '../logger';
import {ValidCheckResult, CalculatorResult} from '../util/calc-results';
import axios from 'axios';

export class CalculatorAddService implements CalculatorAddApi {
  logger: LoggerApi;

  constructor(
    @Inject
    logger: LoggerApi,
  ) {
    this.logger = logger.child('CalculatorAddService');
  }

  /**
   * Convert Roman numeral to number
   * @param value 
   */
  convertToNumber = function(value: string) {
    return new Promise(function(resolve) {

      // get url from environment file
      let url = process.env.NUMBER_ROMAN_URL + value;

      axios.get(url)
        .then(({ data }) => {
          // console.log('convert ' + value + ' to number: ' + data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          resolve(error);
        });
    });
  }

  /**
   * Convert number to Roman numeral
   * @param value 
   */
  convertToRoman = function(value: number) {
    return new Promise(function(resolve) {

      // get url from environment file
      let url = process.env.ROMAN_TO_NUMBER_URL + value;

      axios.get(url)
        .then(({ data }) => {
          // console.log('convert ' + value + ' to Roman: ' + data);
          resolve(data);
        })
        .catch(error => {
          console.log(error);
          resolve(error);
        });
    });
  }

/**
   * Ensure the passed number to convert is valid
   * @param value 
   */
  async isValid(value:string): Promise<ValidCheckResult> {
    let result = new ValidCheckResult(true);

    // this checks for bad characters, order rules, and not having more than 3 consecutive repeats
    // source: google
    let validRoman = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

    if (!value) {
      result.isValid = false;
      result.errorType = Errors.BadRequestError;
      result.errorString = 'ERROR - blank param';
    } else {
      let val = value.toUpperCase();
      let isValid = validRoman.test(val);
      if (!isValid) {
        result.isValid = false;
        result.errorType = Errors.BadRequestError;
        result.errorString = 'ERROR - invalid roman numeral';
      }
    }

    return result;
  }

  /**
   * Add Roman numerals
   * @param params 
   */
  async add(params: string = null): Promise<CalculatorResult> {
    this.logger.info(`Adding roman numerals: ${params}`);

    // pull out each roman numeral from string
    let operands = params.split(',');

    // convert each roman numeral operand, keeping a running total
    let total = 0;
    let idx = 0;
    while (idx < operands.length) {
      // remove any spaces
      let operand = operands[idx].replace(/\s/g, '');

      // first check if we have a valid roman numeral
      let validCheckResult = await this.isValid(operand);
      if (!validCheckResult.isValid) {
        let result = new CalculatorResult(false);
        result.errorString = validCheckResult.errorString;
        result.errorType = validCheckResult.errorType;
        // console.log('Error found: ' + JSON.stringify(result, null, 2));
        return result;
      }

      try {
        // wait for call to complete
        let num = await this.convertToNumber(operand) as number;
        total = total + num;
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
      roman = await this.convertToRoman(total) as string;
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
