import {ContainerConfiguration, Scope} from 'typescript-ioc';
import {CalculatorAddApi} from './calculator-add.api';
import {CalculatorAddService} from './calculator-add.service';

const config: ContainerConfiguration[] = [
  {
    bind: CalculatorAddApi,
    to: CalculatorAddService,
    scope: Scope.Singleton
  }
];

export default config;