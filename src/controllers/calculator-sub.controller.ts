import {GET, Path, QueryParam, Errors} from 'typescript-rest';
import {Inject} from 'typescript-ioc';
import {CalculatorSubApi} from '../services';
import {LoggerApi} from '../logger';

@Path('/sub')
export class CalculatorSubController {

  @Inject
  service: CalculatorSubApi;
  @Inject
  _baseLogger: LoggerApi;

  get logger() {
    return this._baseLogger.child('CalculatorSubController');
  }

  @GET
  async subtractRomanNumerals(@QueryParam('operands') operands: string): Promise<string> {
    this.logger.info(`Trying to add: ${operands}`);

    // return value is CalculatorResult
    let ret = this.service.subtract(operands);
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
