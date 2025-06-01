import { Directive, ElementRef, HostListener, Injectable, Input } from '@angular/core';

@Directive({
  selector: '[limitLineBreak]',
  standalone: true
})
@Injectable({
  providedIn: "root"
})
export class LimitLineBreak {
  @Input('limitLineBreak') maxLineas: number = 10;

  constructor(private el: ElementRef) {}

  @HostListener('input') onInput() {
    const textarea = this.el.nativeElement as HTMLTextAreaElement;
    const lineas = textarea.value.split('\n').length;

    if (lineas > this.maxLineas) {
      textarea.value = textarea.value.substring(0, textarea.value.lastIndexOf('\n'));
    }
  }
}
