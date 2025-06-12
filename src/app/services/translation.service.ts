// import { Injectable, signal } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TranslationService {

//   constructor() { }

//   lang = signal<'en' | 'de'>('en');

//   setLang(newLang: 'en' | 'de') {
//     this.lang.set(newLang);
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private langSubject = new BehaviorSubject<'en' | 'de'>('en');
  lang$ = this.langSubject.asObservable();

  setLang(lang: 'en' | 'de') {
    this.langSubject.next(lang);
  }

  get currentLang(): 'en' | 'de' {
    return this.langSubject.value;
  }
}