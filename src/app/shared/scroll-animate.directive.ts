import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';

@Directive({
  selector: '[appScrollAnimate]',
  standalone: true
})
export class ScrollAnimateDirective implements OnInit, OnDestroy {
  @Input() animationClass: string = 'fade-up';
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.classList.add('animate-on-scroll', this.animationClass);

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('is-visible');
          // Opcional: Desconectar para que anime una sola vez
          this.observer.unobserve(this.el.nativeElement);
        }
      });
    }, {
      threshold: 0.15, // Activa cuando el 15% del elemento sea visible
      rootMargin: '0px 0px -50px 0px' 
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
