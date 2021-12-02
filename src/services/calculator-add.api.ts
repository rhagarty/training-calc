import {CalculatorResult} from '../util/calc-results';

export abstract class CalculatorAddApi {
  abstract add(params?: string): Promise<CalculatorResult>;
}
