import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Note, NoteRelations, Evaluation, Apprenant} from '../models';
import {EvaluationRepository} from './evaluation.repository';
import {ApprenantRepository} from './apprenant.repository';

export class NoteRepository extends DefaultCrudRepository<
  Note,
  typeof Note.prototype.id,
  NoteRelations
> {

  public readonly evalutaion_note: BelongsToAccessor<Evaluation, typeof Note.prototype.id>;

  public readonly apprenant_note: BelongsToAccessor<Apprenant, typeof Note.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EvaluationRepository') protected evaluationRepositoryGetter: Getter<EvaluationRepository>, @repository.getter('ApprenantRepository') protected apprenantRepositoryGetter: Getter<ApprenantRepository>,
  ) {
    super(Note, dataSource);
    this.apprenant_note = this.createBelongsToAccessorFor('apprenant_note', apprenantRepositoryGetter,);
    this.registerInclusionResolver('apprenant_note', this.apprenant_note.inclusionResolver);
    this.evalutaion_note = this.createBelongsToAccessorFor('evalutaion_note', evaluationRepositoryGetter,);
    this.registerInclusionResolver('evalutaion_note', this.evalutaion_note.inclusionResolver);
  }
}
