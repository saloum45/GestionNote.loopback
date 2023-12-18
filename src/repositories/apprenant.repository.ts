import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Apprenant, ApprenantRelations} from '../models';

export class ApprenantRepository extends DefaultCrudRepository<
  Apprenant,
  typeof Apprenant.prototype.id,
  ApprenantRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Apprenant, dataSource);
  }
}
