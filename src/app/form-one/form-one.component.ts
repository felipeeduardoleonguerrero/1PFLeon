import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../student-list/student.interface';

@Component({
  selector: 'app-form-one',
  templateUrl: './form-one.component.html',
  styleUrls: ['./form-one.component.scss']
})
export class FormOneComponent implements OnInit {
studentForm:FormGroup;
@Input() studentToEdit:Student|null; //estudiante a editar
@Output() addedItem = new EventEmitter<any>(); //estudiante añadido por la forma
@Output() editedItem = new EventEmitter <any>(); //estudiante editado por la forma
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    /*Se define el formulario y en caso de editarse por el studentToEdit se llenan los valores del formulario con patchValue*/
    this.studentForm=this.fb.group({
      student:['', Validators .required],
      studentTwo:['', Validators .required],
      course:['', Validators.required],
      class:['', Validators.required]
    })
    if(this.studentToEdit){
      this.studentForm.get('student')?.patchValue(this.studentToEdit.student);
      this.studentForm.get('studentTwo')?.patchValue(this.studentToEdit.student);
      this.studentForm.get('course')?.patchValue(this.studentToEdit.course);
      this.studentForm.get('class')?.patchValue(this.studentToEdit.class);
    }

  }

  onSubmit(){
    /*Evalúa si el elemento se añade o edita. Si se añade, emite editedItem.
    Si se edita emite el itemEdited*/
    if(!this.studentToEdit){
      this.addedItem.emit(this.studentForm.value);
    }else{
      this.studentForm.value['id']=this.studentToEdit.id
      let editedStudent=this.studentForm.value;
      this.editedItem.emit(editedStudent);
    }
    //console.log(this.studentForm);
  }

}
