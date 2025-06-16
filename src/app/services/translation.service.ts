import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private static readonly STORAGE_KEY = 'lang';
  // private langSubject = new BehaviorSubject<'en' | 'de'>('en');
  private langSubject = new BehaviorSubject<'en' | 'de'>(
    (localStorage.getItem(TranslationService.STORAGE_KEY) as 'en' | 'de') || 'en'
  );
  lang$ = this.langSubject.asObservable();

  setLang(lang: 'en' | 'de') {
    this.langSubject.next(lang);
    localStorage.setItem(TranslationService.STORAGE_KEY, lang);
  }

  get currentLang(): 'en' | 'de' {
    return this.langSubject.value;
  }
}