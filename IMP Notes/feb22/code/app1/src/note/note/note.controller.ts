import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { NoteService } from './note.service';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  getNotes() {
    return this.noteService.getNotes();
  }

  @Get('/:id')
  getNote() {
    return this.noteService.getNoteDetails();
  }

  @Post()
  createNote() {
    return this.noteService.createNote();
  }

  @Put()
  updateNote() {
    return this.noteService.updateNote();
  }

  @Delete()
  deleteNote() {
    return this.noteService.deleteNote();
  }
}
