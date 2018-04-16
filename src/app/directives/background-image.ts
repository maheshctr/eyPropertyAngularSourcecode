import {Directive, ElementRef, Input} from '@angular/core';
 
@Directive({
    selector: '[background-image]'
})
export class BackgroundImage {
    private el: HTMLElement;

    constructor(el: ElementRef) {
        this.el = el.nativeElement;
    }

    @Input('background-image') backgroundImage: string;

    ngAfterViewInit() {
        this.el.style.backgroundImage = 'url(' + this.backgroundImage + ')';
        console.log(this.backgroundImage);
    }
 
}