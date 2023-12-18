import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Matiere, MatiereRelations} from '../models';

export class MatiereRepository extends DefaultCrudRepository<
  Matiere,
  typeof Matiere.prototype.id,
  MatiereRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Matiere, dataSource);
  }
}
