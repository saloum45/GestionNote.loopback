import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Matiere, MatiereRelations, Professeur} from '../models';
import {ProfesseurRepository} from './professeur.repository';

export class MatiereRepository extends DefaultCrudRepository<
  Matiere,
  typeof Matiere.prototype.id,
  MatiereRelations
> {

  public readonly professeurs: HasManyRepositoryFactory<Professeur, typeof Matiere.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProfesseurRepository') protected professeurRepositoryGetter: Getter<ProfesseurRepository>,
  ) {
    super(Matiere, dataSource);
    this.professeurs = this.createHasManyRepositoryFactoryFor('professeurs', professeurRepositoryGetter,);
    this.registerInclusionResolver('professeurs', this.professeurs.inclusionResolver);
  }
}
