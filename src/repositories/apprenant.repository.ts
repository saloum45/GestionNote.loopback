import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Apprenant, ApprenantRelations, Classe} from '../models';
import {ClasseRepository} from './classe.repository';

export class ApprenantRepository extends DefaultCrudRepository<
  Apprenant,
  typeof Apprenant.prototype.id,
  ApprenantRelations
> {

  public readonly classe_apprenant: BelongsToAccessor<Classe, typeof Apprenant.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ClasseRepository') protected classeRepositoryGetter: Getter<ClasseRepository>,
  ) {
    super(Apprenant, dataSource);
    this.classe_apprenant = this.createBelongsToAccessorFor('classe_apprenant', classeRepositoryGetter,);
    this.registerInclusionResolver('classe_apprenant', this.classe_apprenant.inclusionResolver);
  }
}
