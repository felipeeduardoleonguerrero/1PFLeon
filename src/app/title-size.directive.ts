//Esta directiva personalizada cambia el tamaño de fuente para H1 en el componente sidenav.

import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTitleSize]'
})
export class TitleSizeDirective {

  constructor(private el: ElementRef ) {
    el.nativeElement.style.fontSize = '20px';
  }

}
