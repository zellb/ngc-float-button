import { EventEmitter } from '@angular/core';
export declare class NgcFloatItemButtonComponent {
    icon: string;
    svgIcon: string;
    content: string;
    color: string;
    clicked: EventEmitter<any>;
    disabled: boolean;
    elementref: any;
    contentref: any;
    emitClickEvent($event: Event): true;
}
