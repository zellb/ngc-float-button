import { ElementRef, ChangeDetectorRef, AfterContentInit, OnDestroy, OnChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
export declare class NgcFloatButtonComponent implements AfterContentInit, OnDestroy, OnChanges {
    private element;
    private cd;
    private elementref;
    private subs;
    state: BehaviorSubject<any>;
    icon: string;
    svgIcon: string;
    direction: string;
    spaceBetweenButtons: number;
    open: Subject<boolean>;
    color: string;
    disabled: boolean;
    events: Subject<any>;
    buttons: any;
    constructor(element: ElementRef, cd: ChangeDetectorRef);
    toggle(): true;
    private checkDirectionType;
    private animateButtons;
    private getTranslate;
    ngAfterContentInit(): void;
    ngOnChanges(changes: any): void;
    ngOnDestroy(): void;
}
