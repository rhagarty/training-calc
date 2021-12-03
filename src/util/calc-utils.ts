import {Errors} from 'typescript-rest';
import {LoggerApi} from '../logger';
import axios from 'axios';

/**
 * Class to hold the result of a calculator function
 */
export class CalculatorResult {
  isValid: boolean;
  result: string;
  errorString: string;
  errorType: object;
  constructor(valid?: boolean, result?: string, errorString?: string, errorType?: object) {
    this.isValid = valid;
    this.result = result;
    this.errorString = errorString;
    this.errorType = errorType;
  }
}

export const OperationTypeMultiply = 'MULT';
export const OperationTypeDivide = 'DIV';
export const OperationTypeAdd = 'ADD';
export const OperationTypeSubtract = 'SUB';

/**
 * Function to convert a Roman numeral to a number
 * @param value 
 */
export function convertToNumber(value: string) {
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
 * Function to convert a number to a Roman numeral
 * @param value 
 */
export function convertToRoman(value: number) {
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
 * Function to ensure that a Roman numeral is valid
 * @param value 
 */
export function isValidRoman(value:string) {
  let result = new CalculatorResult(true, '', );

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

export async function processOperands(operands: string, logger: LoggerApi, operator: string): Promise<CalculatorResult> {
  // pull out each roman numeral from string
  let ops = operands.split(',');

  // convert each roman numeral operand, keeping a running total
  let total = 0;
  let idx = 0;
  while (idx < ops.length) {
    // remove any spaces
    let operand = ops[idx].replace(/\s/g, '');

    // first check if we have a valid roman numeral
    let validCheckResult = isValidRoman(operand);
    if (!validCheckResult.isValid) {
      logger.info('Error found: ' + JSON.stringify(validCheckResult, null, 2));
      return validCheckResult;
    }

    try {
      // wait for call to complete
      let num = await convertToNumber(operand) as number;
      if (idx == 0) {
        // we use the first operand as our base
        total = num;
      } else {
        // perform operation
        switch(operator) {
          case OperationTypeAdd:
            total = total + num;
            break;
          case OperationTypeSubtract:
            total = total - num;
            break;
          case OperationTypeMultiply:
            total = total * num;
            break;
          case OperationTypeDivide:
            logger.info('Dividing ' + total + ' by ' + num);
            total = total / num;
            logger.info('      Result ' + total);  
            break;
        }
      }
    }
    catch (error) {
      console.log(error);
    }
    idx++;
  };

  if (operator === OperationTypeDivide) {
    let round = total.toFixed(0);
    total = parseInt(round);
  }

  logger.info('total = ' + total);  

  // we can't handle numbers < 0 or > 3999
  if (total < 0 || total > 3999) {
    let result = new CalculatorResult(false, '', 
      'ERROR - out of range (negative or > 3999)', 
      Errors.NotImplementedError);
    logger.info('Error found: ' + JSON.stringify(result, null, 2));
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

  let result = new CalculatorResult(true, roman);
  logger.info('Good result: ' + JSON.stringify(result, null, 2));
  return result;
}
