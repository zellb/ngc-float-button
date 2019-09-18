/* created by @GustavoCostaW https://github.com/gustavocostaw/ngc-float-button  */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgcFloatItemButtonComponent } from './ngc-float-item-button.component';
import { Component, Input, ContentChildren, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
var NgcFloatButtonComponent = /** @class */ (function () {
    function NgcFloatButtonComponent(element, cd) {
        this.element = element;
        this.cd = cd;
        this.subs = [];
        this.spaceBetweenButtons = 55;
        this.color = '#dd0031';
        this.disabled = false;
        this.events = new Subject();
        this.elementref = element.nativeElement;
        this.state = new BehaviorSubject({
            display: false,
            direction: 'top',
            event: 'start',
            spaceBetweenButtons: this.spaceBetweenButtons
        });
    }
    NgcFloatButtonComponent.prototype.toggle = function () {
        if (this.disabled) {
            return this.disabled;
        }
        this.state.next(__assign({}, this.state.getValue(), { display: !this.state.getValue().display, event: !this.state.getValue().display ? 'open' : 'close' }));
    };
    // only top and bottom support content element
    NgcFloatButtonComponent.prototype.checkDirectionType = function () {
        if (this.buttons.toArray()) {
            var display_1 = 'block';
            if (this.direction === 'right' || this.direction === 'left') {
                display_1 = 'none';
            }
            this.buttons.toArray().forEach(function (element) {
                element.contentref.nativeElement.style.display = display_1;
            });
        }
    };
    // transition
    NgcFloatButtonComponent.prototype.animateButtons = function (eventType) {
        var _this = this;
        this.buttons.toArray().forEach(function (btn, i) {
            i += 1;
            var style = btn.elementref.nativeElement.style;
            if (eventType !== 'directionChanged' && _this.state.getValue().display) {
                style['transform'] = 'scale(1)';
                style['transition-duration'] = '0s';
                if (btn.timeout) {
                    clearTimeout(btn.timeout);
                }
            }
            setTimeout(function () {
                style['transition-duration'] = _this.state.getValue().display ? 90 + (100 * i) + "ms" : '';
                style['transform'] = _this.state.getValue().display ? _this.getTranslate(i) : '';
            }, 50);
            if (eventType !== 'directionChanged' && !_this.state.getValue().display) {
                btn.timeout = setTimeout(function () {
                    style['transform'] = 'scale(0)';
                }, 90 + (100 * i));
            }
        });
    };
    // get transition direction
    NgcFloatButtonComponent.prototype.getTranslate = function (i) {
        var animation;
        switch (this.direction) {
            case 'right':
                animation = "translate3d(" + this.state.getValue().spaceBetweenButtons * i + "px,0,0)";
                break;
            case 'bottom':
                animation = "translate3d(0," + this.state.getValue().spaceBetweenButtons * i + "px,0)";
                break;
            case 'left':
                animation = "translate3d(-" + this.state.getValue().spaceBetweenButtons * i + "px,0,0)";
                break;
            default:
                animation = "translate3d(0,-" + this.state.getValue().spaceBetweenButtons * i + "px,0)";
                break;
        }
        return animation;
    };
    /* some problems here */
    // @HostListener('document:click', ['$event.target']) private clickOutside(target) {
    //   if (this.state.getValue().display && !this.elementref.contains(target)) {
    //     this.state.next({
    //       ...this.state.getValue(),
    //       display: false,
    //       event: 'close'
    //     });
    //   }
    // }
    NgcFloatButtonComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.direction) {
            // first time to check
            this.checkDirectionType();
        }
        this.buttons.toArray().map(function (v) {
            var sub = v.clicked.subscribe(function () {
                _this.state.next(__assign({}, _this.state.getValue(), { display: false, event: 'close' }));
            });
            _this.subs.push(sub);
        });
        var sub = this.state.subscribe(function (v) {
            _this.animateButtons(v.event);
            _this.events.next({
                display: v.display,
                event: v.event,
                direction: v.direction
            });
        });
        this.subs.push(sub);
    };
    // if @Input values changes, we need check the direction type
    NgcFloatButtonComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.direction && !changes.direction.firstChange) {
            this.state.next(__assign({}, this.state.getValue(), { event: 'directionChanged', direction: changes.direction.currentValue }));
            // if changes happens
            this.checkDirectionType();
        }
        if (changes.open && changes.open.currentValue) {
            var sub = this.open.subscribe(function (v) {
                if (v !== _this.state.getValue().display) {
                    _this.state.next(__assign({}, _this.state.getValue(), { event: v ? 'open' : 'close', display: v }));
                    // make angular happy
                    _this.cd.markForCheck();
                }
            });
            this.subs.push(sub);
        }
        if (changes.spaceBetweenButtons && changes.spaceBetweenButtons.currentValue) {
            this.state.next(__assign({}, this.state.getValue(), { event: 'spaceBetweenButtonsChanged', spaceBetweenButtons: changes.spaceBetweenButtons.currentValue }));
        }
    };
    NgcFloatButtonComponent.prototype.ngOnDestroy = function () {
        this.subs.forEach(function (v) {
            v.unsubscribe();
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgcFloatButtonComponent.prototype, "icon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgcFloatButtonComponent.prototype, "svgIcon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgcFloatButtonComponent.prototype, "direction", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], NgcFloatButtonComponent.prototype, "spaceBetweenButtons", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Subject)
    ], NgcFloatButtonComponent.prototype, "open", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NgcFloatButtonComponent.prototype, "color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NgcFloatButtonComponent.prototype, "disabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Subject)
    ], NgcFloatButtonComponent.prototype, "events", void 0);
    __decorate([
        ContentChildren(NgcFloatItemButtonComponent),
        __metadata("design:type", Object)
    ], NgcFloatButtonComponent.prototype, "buttons", void 0);
    NgcFloatButtonComponent = __decorate([
        Component({
            changeDetection: ChangeDetectionStrategy.OnPush,
            selector: 'ngc-float-button',
            styles: ["\n\n  :host {\n    position: absolute;\n  }\n\n  .fab-menu {\n      box-sizing: border-box;\n      font-size: 20px;\n      width:55px;\n      height: 55px;\n      text-align: left;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      cursor: pointer;\n      z-index: 9;\n  }\n\n  .fab-toggle {\n    border-radius: 100%;\n    width: 40px;\n    height: 40px;\n    color: white;\n    text-align: center;\n    line-height: 50px;\n    transform: translate3d(0, 0, 0);\n    transition: all ease-out 200ms;\n    z-index: 2;\n    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);\n    transition-duration: 400ms;\n    transform: scale(1.1, 1.1) translate3d(0, 0, 0);\n    cursor: pointer;\n    box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);\n  }\n\n  .fab-menu .fab-toggle:hover {\n    transform: scale(1.2, 1.2) translate3d(0, 0, 0);\n  }\n\n  .fab-menu /deep/ .item {\n     opacity: 0;\n  }\n\n  .fab-menu.active /deep/ .item {\n     opacity: 1;\n  }\n\n  .fab-menu.active /deep/ .content-wrapper {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .fab-menu.active /deep/ .content {\n    display: block;\n  }\n\n  .fab-menu.active .fab-toggle {\n    transition-timing-function: linear;\n    transition-duration: 200ms;\n    transform: scale(0.8, 0.8) translate3d(0, 0, 0);\n  }\n\n  "],
            template: "\n    <nav class=\"fab-menu\" [class.active]=\"(state | async).display\">\n        <a class=\"fab-toggle\" (click)=\"toggle()\" [style.backgroundColor]=\"color\">\n          <mat-icon *ngIf=\"svgIcon\" [svgIcon]=\"svgIcon\"></mat-icon>\n          <mat-icon *ngIf=\"!svgIcon\">{{icon}}</mat-icon>\n        </a>\n        <ng-content></ng-content>\n    </nav>\n  "
        }),
        __metadata("design:paramtypes", [ElementRef, ChangeDetectorRef])
    ], NgcFloatButtonComponent);
    return NgcFloatButtonComponent;
}());
export { NgcFloatButtonComponent };
//# sourceMappingURL=ngc-float-button.component.js.map