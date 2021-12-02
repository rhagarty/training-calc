import { Container } from "typescript-ioc";
import * as dotenv from 'dotenv';

export * from './calculator-add.api';
export * from './calculator-add.service';

import config from './ioc.config';

dotenv.config();
Container.configure(...config);