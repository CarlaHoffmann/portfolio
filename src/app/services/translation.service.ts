import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() { }

  private langSubject = new BehaviorSubject<'en' | 'de'>('en');
  lang$ = this.langSubject.asObservable();

  // lang = signal<'en' | 'de'>('en');

  // setLang(newLang: 'en' | 'de') {
  //   this.lang.set(newLang);
  // }
  setLang(newLang: 'en' | 'de') {
    this.langSubject.next(newLang); // <-- richtig!
  }

  get currentLang(): 'en' | 'de' {
    return this.langSubject.value;
  }
}
