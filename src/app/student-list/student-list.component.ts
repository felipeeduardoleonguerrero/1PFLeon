import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Student } from './student.interface';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  @Input() students:Student[];
  @Output() studentToEdit= new EventEmitter <Student>();
  @Output() studentsUpdated = new EventEmitter<Student[] | null>();
  displayedColumns=['student', 'course', 'class', 'edit', 'delete']
  @ViewChild('table') table: MatTable<any>;
  constructor() { }

  ngOnInit(): void {
  }

  onClickRow(el:Student){
    /*Avisa al componente padre del elemento a editar*/
    this.studentToEdit.emit(el);
  }

  onDeleteElement(el:any){
    /* Se busca al elemento por id en el array de estudiantes, se elimina al elemento por índice y luego usando ViewChild se carga de nuevo la tabla. Por último, emitimos el valor de studentsUpdated al padre. */
    let index=this.students.findIndex(x=> x.id===el.id);
    this.students.splice(index,1);
    this.table.renderRows();
    this.studentsUpdated.emit(this.students);
  }

}
