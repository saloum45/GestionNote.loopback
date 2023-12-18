import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Professeur, ProfesseurRelations, Matiere, Classe} from '../models';
import {MatiereRepository} from './matiere.repository';
import {ClasseRepository} from './classe.repository';

export class ProfesseurRepository extends DefaultCrudRepository<
  Professeur,
  typeof Professeur.prototype.id,
  ProfesseurRelations
> {

  public readonly matiere_professeur: BelongsToAccessor<Matiere, typeof Professeur.prototype.id>;

  public readonly classe_professeur: BelongsToAccessor<Classe, typeof Professeur.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MatiereRepository') protected matiereRepositoryGetter: Getter<MatiereRepository>, @repository.getter('ClasseRepository') protected classeRepositoryGetter: Getter<ClasseRepository>,
  ) {
    super(Professeur, dataSource);
    this.classe_professeur = this.createBelongsToAccessorFor('classe_professeur', classeRepositoryGetter,);
    this.registerInclusionResolver('classe_professeur', this.classe_professeur.inclusionResolver);
    this.matiere_professeur = this.createBelongsToAccessorFor('matiere_professeur', matiereRepositoryGetter,);
    this.registerInclusionResolver('matiere_professeur', this.matiere_professeur.inclusionResolver);
  }
}
