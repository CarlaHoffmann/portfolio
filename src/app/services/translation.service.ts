import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() { }

  lang = signal<'en' | 'de'>('en');

  setLang(newLang: 'en' | 'de') {
    this.lang.set(newLang);
  }
}
