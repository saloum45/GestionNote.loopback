import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Classe, ClasseRelations, Apprenant, Professeur} from '../models';
import {ApprenantRepository} from './apprenant.repository';
import {ProfesseurRepository} from './professeur.repository';

export class ClasseRepository extends DefaultCrudRepository<
  Classe,
  typeof Classe.prototype.id,
  ClasseRelations
> {

  public readonly apprenants: HasManyRepositoryFactory<Apprenant, typeof Classe.prototype.id>;

  public readonly professeurs: HasManyRepositoryFactory<Professeur, typeof Classe.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ApprenantRepository') protected apprenantRepositoryGetter: Getter<ApprenantRepository>, @repository.getter('ProfesseurRepository') protected professeurRepositoryGetter: Getter<ProfesseurRepository>,
  ) {
    super(Classe, dataSource);
    this.professeurs = this.createHasManyRepositoryFactoryFor('professeurs', professeurRepositoryGetter,);
    this.registerInclusionResolver('professeurs', this.professeurs.inclusionResolver);
    this.apprenants = this.createHasManyRepositoryFactoryFor('apprenants', apprenantRepositoryGetter,);
    this.registerInclusionResolver('apprenants', this.apprenants.inclusionResolver);
  }
}
