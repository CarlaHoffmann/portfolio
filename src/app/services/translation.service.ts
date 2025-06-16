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