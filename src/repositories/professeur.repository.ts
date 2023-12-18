import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Professeur, ProfesseurRelations} from '../models';

export class ProfesseurRepository extends DefaultCrudRepository<
  Professeur,
  typeof Professeur.prototype.id,
  ProfesseurRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Professeur, dataSource);
  }
}
