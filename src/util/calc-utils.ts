import {Errors} from 'typescript-rest';
import axios from 'axios';

/**
 * Class to hold all relevant error data
 */
export class ValidCheckResult {
  isValid: boolean;
  errorString: string;
  errorType: object;
  constructor(valid: boolean, error?: string, type?: object) {
    this.isValid = valid;
    this.errorString = error;
    this.errorType = type;
  }
}

/**
 * Class to hold the result of a calculator function
 */
export class CalculatorResult {
  isValid: boolean;
  result: string;
  errorString: string;
  errorType: object;
  constructor(valid: boolean, result?: string, errorString?: string, errorType?: object) {
    this.isValid = valid;
    this.result = result;
    this.errorString = errorString;
    this.errorType = errorType;
  }
}

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
export function isValid(value:string) {
  let result = new ValidCheckResult(true, '', );

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
