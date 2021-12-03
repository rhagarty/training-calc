import {CalculatorResult} from '../util/calc-utils';

export abstract class CalculatorDivApi {
  abstract divide(params?: string): Promise<CalculatorResult>;
}
