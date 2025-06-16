import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SlideBtnComponent } from '../slide-btn/slide-btn.component';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslationService } from '../services/translation.service';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, SlideBtnComponent, RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  http = inject(HttpClient);
  translations = {
    en: {
      contactMe: 'Contact me',
      letsWork: "Let's work <br> together",
      gotAProblem: 'Got a problem to solve?',
      info: `I’m always excited to connect with new people and explore opportunities to collaborate. If you have a project or idea in mind, feel free to reach out! I’m ready to help bring creative solutions to life. With my skills and passion for web development, I’m confident I can add real value to your team and help your project succeed.<br><br>Need a Frontend developer? <span class="green">Let’s talk!</span>`,
      whatsYourName: "What's your name?",
      namePlaceholder: 'Your name goes here',
      nameWarning: "Oops! it seems your name is missing",
      whatsYourEmail: "What's your email?",
      emailPlaceholder: "youremail@email.com",
      emailWarning: "Hoppla! your email is required",
      howCanIHelp: "How can I help you?",
      messagePlaceholder: "Hello Carla, I am interested in...",
      messageWarning: "What do you need to develop?",
      privacyPolicy: "privacy policy",
      privacyPolicy1: "I've read the ",
      privacyPolicy2: " and agree to the processing of my data as outlined.",
      acceptPolicyWarning: "Please accept the privacy policy.",
      submitBtn: "Say Hello ;)",
      contactSuccess: "Your message has been sent successfully!",
      contactError: "Oops! Message not sent. Please try again later."
    },
    de: {
      contactMe: 'Kontakt',
      letsWork: "Lass uns <br> zusammenarbeiten",
      gotAProblem: 'Hast du ein Problem zu lösen?',
      info: `Ich freue mich immer, neue Menschen kennenzulernen und Möglichkeiten zur Zusammenarbeit zu entdecken. Wenn du ein Projekt oder eine Idee hast, melde dich gerne bei mir! Ich bin bereit, kreative Lösungen zum Leben zu erwecken. Mit meinen Fähigkeiten und meiner Leidenschaft für Webentwicklung bin ich überzeugt, echten Mehrwert für dein Team zu schaffen und dein Projekt zum Erfolg zu führen.<br><br>Brauchst du eine Frontend-Entwicklerin? <span class="green">Lass uns reden!</span>`,
      whatsYourName: "Wie ist dein Name?",
      namePlaceholder: 'Platz für deinen Namen',
      nameWarning: "Ups! Dein Name fehlt noch",
      whatsYourEmail: "Wie lautet deine E-Mail?",
      emailPlaceholder: "deine@email.de",
      emailWarning: "Hoppla! Deine E-Mail fehlt noch",
      howCanIHelp: "Wie kann ich helfen?",
      messagePlaceholder: "Hallo Carla, ich interessiere mich für...",
      messageWarning: "Wobei brauchst du Unterstützung?",
      privacyPolicy: "Datenschutzerklärung",
      privacyPolicy1: "Ich habe die ",
      privacyPolicy2: " gelesen und stimme der Verarbeitung meiner Daten wie beschrieben zu.",
      acceptPolicyWarning: "Bitte akzeptiere die Datenschutzerklärung.",
      submitBtn: "Sag Hallo ;)",
      contactSuccess: "Die Nachricht wurde erfolgreich verschickt!",
      contactError: "Ups! Nachricht nicht gesendet. Bitte später erneut versuchen."
    }
  };

  lang: 'en' | 'de' = 'en';
  t: any = this.translations.en;

  private langSub!: Subscription;

  contactData = {
    name: "",
    email: "",
    message: "",
  }
  policyAccepted = false;
  formSubmitted = false;

  showNameInput = true;
  showEmailInput = true;
  showMessageInput = true;

  shakeName = false;
  shakeEmail = false;
  shakeMessage = false;

  mailTest = false;
  mailSent = false;
  mailError = false;

  post = {
    endPoint: 'https://carla-hoffmann.net/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  constructor(
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

  onSubmit(ngForm: NgForm) {
    this.formSubmitted = true;
    this.validateFields(ngForm);

    if (!ngForm.valid) {
      return;
    }

    if (ngForm.submitted && ngForm.form.valid) {
      if (!this.mailTest) {
        this.sendMail(ngForm);
      } else {
        this.sendTestMail(ngForm);
      }
    }
  }

  private validateFields(ngForm: NgForm) {
    this.showNameInput = !(ngForm.controls['name'] && !ngForm.controls['name'].valid);
    this.showEmailInput = !(ngForm.controls['email'] && !ngForm.controls['email'].valid);
    this.showMessageInput = !(ngForm.controls['message'] && !ngForm.controls['message'].valid);
  }

  private resetForm(ngForm: NgForm) {
    ngForm.resetForm({ policyAccepted: false });
    this.formSubmitted = false;
    this.showNameInput = true;
    this.showEmailInput = true;
    this.showMessageInput = true;
  }

  private sendMail(ngForm: NgForm) {
    this.http.post(this.post.endPoint, this.post.body(this.contactData))
      .subscribe({
        next: (response) => {
          this.resetForm(ngForm);
        },
        error: (error) => {
          // console.error(error);
          this.mailError = true;
          setTimeout(() => this.mailError = false, 3000);
        },
        complete: () => {
          console.info('send post complete');
          this.mailSent = true;
          setTimeout(() => this.mailSent = false, 3000);
        },
  
      });
  }

  private sendTestMail(ngForm: NgForm) {
    // console.log('Test mail');
    this.resetForm(ngForm);
  }

  triggerShake(field: 'name' | 'email' | 'message') {
    if (field === 'name') {
      this.shakeName = false;
      setTimeout(() => this.shakeName = true, 0);
      setTimeout(() => this.shakeName = false, 200);
    }
    if (field === 'email') {
      this.shakeEmail = false;
      setTimeout(() => this.shakeEmail = true, 0);
      setTimeout(() => this.shakeEmail = false, 200);
    }
    if (field === 'message') {
      this.shakeMessage = false;
      setTimeout(() => this.shakeMessage = true, 0);
      setTimeout(() => this.shakeMessage = false, 200);
    }
  }

  triggerOffShake(field: 'name' | 'email' | 'message') {
    if (field === 'name') {
      this.shakeName = false;
      setTimeout(() => this.shakeName = true, 0);
      setTimeout(() => this.shakeName = false, 50);
    }
    if (field === 'email') {
      this.shakeEmail = false;
      setTimeout(() => this.shakeEmail = true, 0);
      setTimeout(() => this.shakeEmail = false, 50);
    }
    if (field === 'message') {
      this.shakeMessage = false;
      setTimeout(() => this.shakeMessage = true, 0);
      setTimeout(() => this.shakeMessage = false, 50);
    }
  }
}
