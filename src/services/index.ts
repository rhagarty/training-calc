import { Container } from "typescript-ioc";
import * as dotenv from 'dotenv';

export * from './calculator-add.api';
export * from './calculator-add.service';
export * from './calculator-sub.api';
export * from './calculator-sub.service';
export * from './calculator-mult.api';
export * from './calculator-mult.service';

import config from './ioc.config';

dotenv.config();
Container.configure(...config);