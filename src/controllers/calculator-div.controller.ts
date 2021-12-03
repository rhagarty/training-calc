import {GET, Path, QueryParam, Errors} from 'typescript-rest';
import {Inject} from 'typescript-ioc';
import {CalculatorDivApi} from '../services';
import {LoggerApi} from '../logger';

@Path('/div')
export class CalculatorDivController {

  @Inject
  service: CalculatorDivApi;
  @Inject
  _baseLogger: LoggerApi;

  get logger() {
    return this._baseLogger.child('CalculatorDivController');
  }

  @GET
  async divideRomanNumerals(@QueryParam('operands') operands: string): Promise<string> {
    this.logger.info(`Trying to divide: ${operands}`);

    // return value is CalculatorResult
    let ret = this.service.divide(operands);
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
