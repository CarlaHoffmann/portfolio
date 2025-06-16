import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
  @ViewChild('customCursor') customCursor!: ElementRef<HTMLDivElement>;
  private scrollTimeout: any;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const cursor = this.customCursor.nativeElement;
    cursor.style.left = event.clientX + 'px';
    cursor.style.top = event.clientY + 'px';
  }

  @HostListener('window:scroll')
  onScroll() {
    const cursor = this.customCursor.nativeElement;
    cursor.classList.add('scrolling');
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      cursor.classList.remove('scrolling');
    }, 300); 
  }
}
