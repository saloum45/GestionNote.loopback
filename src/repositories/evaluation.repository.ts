import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Evaluation, EvaluationRelations} from '../models';

export class EvaluationRepository extends DefaultCrudRepository<
  Evaluation,
  typeof Evaluation.prototype.id,
  EvaluationRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Evaluation, dataSource);
  }
}
