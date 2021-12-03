import {GET, Path, QueryParam, Errors} from 'typescript-rest';
import {Inject} from 'typescript-ioc';
import {CalculatorMultApi} from '../services';
import {LoggerApi} from '../logger';

@Path('/mult')
export class CalculatorMultController {

  @Inject
  service: CalculatorMultApi;
  @Inject
  _baseLogger: LoggerApi;

  get logger() {
    return this._baseLogger.child('CalculatorMultController');
  }

  @GET
  async multiplyRomanNumerals(@QueryParam('operands') operands: string): Promise<string> {
    this.logger.info(`Trying to multiply: ${operands}`);

    // return value is CalculatorResult
    let ret = this.service.multiply(operands);
    if ((await ret).isValid) {
      return (await ret).result;
    } else {
      let type = ((await ret).errorType);
      if (type == Errors.NotImplementedError) {
        throw new Errors.NotImplementedError((await ret).errorString);
      } else {
        throw new Errors.BadRequestError((await ret).errorString);
      }
    }
  }
}
