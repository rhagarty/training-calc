import {CalculatorResult} from '../util/calc-utils';

export abstract class CalculatorAddApi {
  abstract add(params?: string): Promise<CalculatorResult>;
}
