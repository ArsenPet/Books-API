import {Entity, model, property} from '@loopback/repository';

@model()
export class books extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  author?: string;

  @property({
    type: 'number',
  })
  pages?: number;

  @property({
    type: 'string',
  })
  description?: string;

  constructor(data?: Partial<books>) {
    super(data);
  }
}

export interface BooksRelations {}

export type BooksWithRelations = books & BooksRelations;
