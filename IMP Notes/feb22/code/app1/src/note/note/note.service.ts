import { Injectable } from '@nestjs/common';

@Injectable()
export class NoteService {
  getNotes() {
    return [];
  }

  getNoteDetails() {
    return {};
  }

  createNote() {
    return 'created';
  }

  updateNote() {
    return 'updated';
  }

  deleteNote() {
    return 'deleted';
  }
}
