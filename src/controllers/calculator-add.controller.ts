import {GET, Path, QueryParam, Errors} from 'typescript-rest';
import {Inject} from 'typescript-ioc';
import {CalculatorAddApi} from '../services';
import {LoggerApi} from '../logger';

@Path('/add')
export class CalculatorAddController {

  @Inject
  service: CalculatorAddApi;
  @Inject
  _baseLogger: LoggerApi;

  get logger() {
    return this._baseLogger.child('CalculatorAddController');
  }

  @GET
  async addRomanNumerals(@QueryParam('operands') operands: string): Promise<string> {
    this.logger.info(`Trying to add: ${operands}`);

    // return value is CalculatorResult
    let ret = this.service.add(operands);
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
