import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { RouterModule } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent implements OnInit, OnDestroy {
  translations = {
    en: {
      back: 'Back',
      legalNotice: 'Legal notice',
      imprint: 'Imprint',
      provider: 'Provider',
      contact: 'Contact us',
      email: 'Email',
      phone: 'Phone',
      disclaimer: 'Disclaimer',
      disclaimerText: `We are responsible for the content of our website in accordance with the provisions of general law. All content is created with due care and to the best of our knowledge.
        Insofar as we refer to third-party websites on our Internet pages by means of hyperlinks, we cannot assume any liability for the continued topicality, correctness and completeness of the linked content, as this content is outside our area of responsibility and we have no influence on its future design. Should you consider any content to be in breach of applicable law or inappropriate, please let us know.
        The legal information on this page as well as all questions and disputes in connection with the design of this website are subject to the laws of the Federal Republic of Germany.`,
      copyright: 'Copyright notice',
      copyrightText: `The texts, images, photos, videos or graphics available on our website are generally subject to copyright protection. Any unauthorized use (especially copying, editing or distribution) of this copyright-protected content is therefore prohibited. If you intend to use this content or parts thereof, please contact us in advance using the details above. If we are not the owner of the required copyrighted rights of use ourselves, we will endeavor to arrange contact with the entitled party.`,
      date: 'Date: June 04, 2025',
      createdWith: `Created with the kind support of <a href="https://www.dieter-datenschutz.de/?_gl=1*3cdztl*_ga*MTIxMzE0OTgzOC4xNzQ5MDM1ODcx*_ga_7CBXCBBGR5*czE3NDkwMzU4NzAkbzEkZzEkdDE3NDkwMzU5OTQkajgkbDAkaDA.*_gcl_au*NzI0MTU2Mi4xNzQ5MDM1ODcxLjE1NTcxMDMxMzMuMTc0OTAzNTk1Mi4xNzQ5MDM1OTUy" class='linking green'> Dieter does data protection</a>`,
      dieterLegal: `"Dieter macht den Datenschutz" is a product of simply Legal GmbH, Burkarderstr. 36, D-97082 Würzburg. All rights reserved 2025.`
    },
    de: {
      back: 'Zurück',
      legalNotice: 'Impressum',
      imprint: 'Impressum',
      provider: 'Anbieter',
      contact: 'Kontakt',
      email: 'E-Mail',
      phone: 'Telefon',
      disclaimer: 'Haftungsausschluss',
      disclaimerText: `Wir sind für die Inhalte unserer Website nach den allgemeinen Gesetzen verantwortlich. Alle Inhalte werden mit größter Sorgfalt und nach bestem Wissen erstellt.
        Sofern wir auf Internetseiten Dritter mittels Hyperlinks verweisen, können wir keine Gewähr für die fortlaufende Aktualität, Richtigkeit und Vollständigkeit der verlinkten Inhalte übernehmen, da diese Inhalte außerhalb unseres Verantwortungsbereichs liegen und wir keinen Einfluss auf deren zukünftige Gestaltung haben. Sollten Sie Inhalte als rechtswidrig oder unangemessen empfinden, informieren Sie uns bitte.
        Die rechtlichen Hinweise auf dieser Seite sowie alle Fragen und Streitigkeiten im Zusammenhang mit der Gestaltung dieser Website unterliegen dem Recht der Bundesrepublik Deutschland.`,
      copyright: 'Urheberrechtshinweis',
      copyrightText: `Die auf unserer Website bereitgestellten Texte, Bilder, Fotos, Videos oder Grafiken unterliegen in der Regel dem Urheberrecht. Jede nicht genehmigte Nutzung (insbesondere das Kopieren, Bearbeiten oder die Verbreitung) dieser urheberrechtlich geschützten Inhalte ist daher untersagt. Wenn Sie diese Inhalte oder Teile davon verwenden möchten, kontaktieren Sie uns bitte vorab über die oben angegebenen Kontaktdaten. Sollten wir selbst nicht Inhaber der erforderlichen urheberrechtlichen Nutzungsrechte sein, bemühen wir uns, den Kontakt zum Berechtigten herzustellen.`,
      date: 'Stand: 04. Juni 2025',
      createdWith: `Erstellt mit freundlicher Unterstützung von <a href="https://www.dieter-datenschutz.de/?_gl=1*3cdztl*_ga*MTIxMzE0OTgzOC4xNzQ5MDM1ODcx*_ga_7CBXCBBGR5*czE3NDkwMzU4NzAkbzEkZzEkdDE3NDkwMzU5OTQkajgkbDAkaDA.*_gcl_au*NzI0MTU2Mi4xNzQ5MDM1ODcxLjE1NTcxMDMxMzMuMTc0OTAzNTk1Mi4xNzQ5MDM1OTUy" class='linking green'> Dieter macht den Datenschutz</a>`,
      dieterLegal: `"Dieter macht den Datenschutz" ist ein Produkt der simply Legal GmbH, Burkarderstr. 36, D-97082 Würzburg. Alle Rechte vorbehalten 2025.`
    }
  };

  lang: 'en' | 'de' = 'en';
  t: any = this.translations.en;

  private langSub!: Subscription;

  constructor(
    public navigation: NavigationService,
    private translation: TranslationService
  ) {}

  ngOnInit() {
    this.langSub = this.translation.lang$.subscribe(lang => {
      this.lang = lang;
      this.t = this.translations[lang];
    });
    this.lang = this.translation.currentLang;
    this.t = this.translations[this.lang];
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }
}
