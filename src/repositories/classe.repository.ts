import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Classe, ClasseRelations} from '../models';

export class ClasseRepository extends DefaultCrudRepository<
  Classe,
  typeof Classe.prototype.id,
  ClasseRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Classe, dataSource);
  }
}
