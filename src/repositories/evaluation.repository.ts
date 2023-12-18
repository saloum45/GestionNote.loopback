import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Evaluation, EvaluationRelations, Classe, Matiere} from '../models';
import {ClasseRepository} from './classe.repository';
import {MatiereRepository} from './matiere.repository';

export class EvaluationRepository extends DefaultCrudRepository<
  Evaluation,
  typeof Evaluation.prototype.id,
  EvaluationRelations
> {

  public readonly classe_evaluation: BelongsToAccessor<Classe, typeof Evaluation.prototype.id>;

  public readonly matiere_evaluation: BelongsToAccessor<Matiere, typeof Evaluation.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ClasseRepository') protected classeRepositoryGetter: Getter<ClasseRepository>, @repository.getter('MatiereRepository') protected matiereRepositoryGetter: Getter<MatiereRepository>,
  ) {
    super(Evaluation, dataSource);
    this.matiere_evaluation = this.createBelongsToAccessorFor('matiere_evaluation', matiereRepositoryGetter,);
    this.registerInclusionResolver('matiere_evaluation', this.matiere_evaluation.inclusionResolver);
    this.classe_evaluation = this.createBelongsToAccessorFor('classe_evaluation', classeRepositoryGetter,);
    this.registerInclusionResolver('classe_evaluation', this.classe_evaluation.inclusionResolver);
  }
}
