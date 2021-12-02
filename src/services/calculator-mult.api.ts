import {CalculatorResult} from '../util/calc-utils';

export abstract class CalculatorMultApi {
  abstract multiply(params?: string): Promise<CalculatorResult>;
}
