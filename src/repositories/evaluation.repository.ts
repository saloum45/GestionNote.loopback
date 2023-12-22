import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Evaluation, EvaluationRelations, Classe, Matiere, Note} from '../models';
import {ClasseRepository} from './classe.repository';
import {MatiereRepository} from './matiere.repository';
import {NoteRepository} from './note.repository';

export class EvaluationRepository extends DefaultCrudRepository<
  Evaluation,
  typeof Evaluation.prototype.id,
  EvaluationRelations
> {

  public readonly classe_evaluation: BelongsToAccessor<Classe, typeof Evaluation.prototype.id>;

  public readonly matiere_evaluation: BelongsToAccessor<Matiere, typeof Evaluation.prototype.id>;

  public readonly notes: HasManyRepositoryFactory<Note, typeof Evaluation.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ClasseRepository') protected classeRepositoryGetter: Getter<ClasseRepository>, @repository.getter('MatiereRepository') protected matiereRepositoryGetter: Getter<MatiereRepository>, @repository.getter('NoteRepository') protected noteRepositoryGetter: Getter<NoteRepository>,
  ) {
    super(Evaluation, dataSource);
    this.notes = this.createHasManyRepositoryFactoryFor('notes', noteRepositoryGetter,);
    this.registerInclusionResolver('notes', this.notes.inclusionResolver);
    this.matiere_evaluation = this.createBelongsToAccessorFor('matiere_evaluation', matiereRepositoryGetter,);
    this.registerInclusionResolver('matiere_evaluation', this.matiere_evaluation.inclusionResolver);
    this.classe_evaluation = this.createBelongsToAccessorFor('classe_evaluation', classeRepositoryGetter,);
    this.registerInclusionResolver('classe_evaluation', this.classe_evaluation.inclusionResolver);
  }
}
