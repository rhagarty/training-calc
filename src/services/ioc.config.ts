import {ContainerConfiguration, Scope} from 'typescript-ioc';
import {CalculatorAddApi} from './calculator-add.api';
import {CalculatorAddService} from './calculator-add.service';
import {CalculatorSubApi} from './calculator-sub.api';
import {CalculatorSubService} from './calculator-sub.service';
import {CalculatorMultApi} from './calculator-mult.api';
import {CalculatorMultService} from './calculator-mult.service';

const config: ContainerConfiguration[] = [
  {
    bind: CalculatorAddApi,
    to: CalculatorAddService,
    scope: Scope.Singleton
  },
  {
    bind: CalculatorSubApi,
    to: CalculatorSubService,
    scope: Scope.Singleton
  },
  {
    bind: CalculatorMultApi,
    to: CalculatorMultService,
    scope: Scope.Singleton
  }
];

export default config;