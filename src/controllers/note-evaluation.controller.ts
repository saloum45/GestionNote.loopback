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
  Evaluation,
} from '../models';
import {NoteRepository} from '../repositories';

export class NoteEvaluationController {
  constructor(
    @repository(NoteRepository)
    public noteRepository: NoteRepository,
  ) { }

  @get('/notes/{id}/evaluation', {
    responses: {
      '200': {
        description: 'Evaluation belonging to Note',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Evaluation),
          },
        },
      },
    },
  })
  async getEvaluation(
    @param.path.number('id') id: typeof Note.prototype.id,
  ): Promise<Evaluation> {
    return this.noteRepository.evalutaion_note(id);
  }
}
