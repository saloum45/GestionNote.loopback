import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Apprenant, ApprenantRelations, Classe, Note} from '../models';
import {ClasseRepository} from './classe.repository';
import {NoteRepository} from './note.repository';

export class ApprenantRepository extends DefaultCrudRepository<
  Apprenant,
  typeof Apprenant.prototype.id,
  ApprenantRelations
> {

  public readonly classe_apprenant: BelongsToAccessor<Classe, typeof Apprenant.prototype.id>;

  public readonly notes: HasManyRepositoryFactory<Note, typeof Apprenant.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ClasseRepository') protected classeRepositoryGetter: Getter<ClasseRepository>, @repository.getter('NoteRepository') protected noteRepositoryGetter: Getter<NoteRepository>,
  ) {
    super(Apprenant, dataSource);
    this.notes = this.createHasManyRepositoryFactoryFor('notes', noteRepositoryGetter,);
    this.registerInclusionResolver('notes', this.notes.inclusionResolver);
    this.classe_apprenant = this.createBelongsToAccessorFor('classe_apprenant', classeRepositoryGetter,);
    this.registerInclusionResolver('classe_apprenant', this.classe_apprenant.inclusionResolver);
  }
}
