import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Note,
  Apprenant,
} from '../models';
import {NoteRepository} from '../repositories';

export class NoteApprenantController {
  constructor(
    @repository(NoteRepository)
    public noteRepository: NoteRepository,
  ) { }

  @get('/notes/{id}/apprenant', {
    responses: {
      '200': {
        description: 'Apprenant belonging to Note',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Apprenant),
          },
        },
      },
    },
  })
  async getApprenant(
    @param.path.number('id') id: typeof Note.prototype.id,
  ): Promise<Apprenant> {
    return this.noteRepository.apprenant_note(id);
  }
}
