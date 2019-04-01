import {Directive, ElementRef, Renderer2} from '@angular/core';


@Directive({
  selector: '[pvEditor]'
})
export class EditorDirective {

  editor: any;

  constructor(public element: ElementRef, public renderer: Renderer2) {
    // this.editor = new CodeMirror.fromTextArea(element.nativeElement, {lineNumbers: true, mode: {name: "javascript", globalVars: true}});
  }

}
