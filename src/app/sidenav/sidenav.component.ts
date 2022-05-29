import { Component, ElementRef, ViewChild } from '@angular/core';
//import { Subscription } from 'rxjs';
//import { SidenavButtonService } from '../sidenav-button.service';
import { Student } from '../student-list/student.interface';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  showFiller = false;
  data:any=[]; //propiedad otorgada a la lista para llenar la tabla
  dataSubmitted=true; //booleano de la ngIf para poder operar entre formulario y lista de estudiantes
  studentToEdit:Student|null; //propiedad para el estudiante en el formulario
  onItemAdd(e:any){
    /* En este método actualiza la data y modifica el id manualmente en el front-end */
    let index=1;
    if(this.data.length>0){
      index=this.data.length+1;
      e['id']=index;
      this.data.push(e);
    }else{
      e['id']=index;
      this.data.push(e)
    }
    this.dataSubmitted=true;
  }

  onItemEdit(e:any){
    /*Una vez editado, se busca en la data de la tabla cual es el elemento editado
    y se cambia su valor.*/
    let index=this.data.findIndex((x:Student)=>x.id===e.id);
    this.data[index]=e;
    this.dataSubmitted=true;
  }

  onPassEdit(e:any){
    /*Asigna a studentToEdit el valor del objeto a editar y pasa al formulario*/
    this.dataSubmitted=false;
    this.studentToEdit=e;
  }

  onClickAdd(){
    /*Pasa al formulario y además cambia el valor a editar a null*/
    this.dataSubmitted=false;
    this.studentToEdit=null;
  }

  onUpdateDeleteStudents(el:any){
    /* Una vez editado por delete, 
    se modifican los ids (para evitar errores en delete) y ademas hace un update del valor de data */
    el.forEach((el:any,index:number)=>{
      el['id']=index+1
    })
    this.data=el;
  }

  /*
  @ViewChild ('drawer') drawer: ElementRef;
  clickEventSubscription:Subscription

  constructor (private sidenavButtonService:SidenavButtonService) {
    this.clickEventSubscription = this.sidenavButtonService.getClickEvent().subscribe(()=>{
      this.openSidenav();
    });
  }
  count:number=0;
  openSidenav(){
    this.count++;
  }*/

}
