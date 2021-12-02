import {CalculatorResult} from '../util/calc-utils';

export abstract class CalculatorSubApi {
  abstract subtract(params?: string): Promise<CalculatorResult>;
}
