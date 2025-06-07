import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { SlideBtnComponent } from '../slide-btn/slide-btn.component';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, SlideBtnComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  http = inject(HttpClient);
  translation = inject(TranslationService);

  translations = {
    en: {
      contactMe: 'Contact me',
      letsWork: "Let's work <br> together",
      gotAProblem: 'Got a problem to solve?',
      info: `Encourage people to contact you and describe what role you are interested in. Show that you will add value to their projects through your work.<br><br>Need a Frontend developer? <span class="green">Let’s talk!</span>`,
      whatsYourName: "What's your name?",
      namePlaceholder: 'Your name goes here',
      nameWarning: "Oops! it seems your name is missing",
      whatsYourEmail: "What's your email?",
      emailPlaceholder: "youremail@email.com",
      emailWarning: "Hoppla! your email is required",
      howCanIHelp: "How can I help you?",
      messagePlaceholder: "Hello Carla, I am interested in...",
      messageWarning: "What do you need to develop?",
      privacyPolicy: "I've read the <a href='privacy-policy' class='policy-link green'>privacy policy</a> and agree to the processing of my data as outlined.",
      acceptPolicyWarning: "Please accept the privacy policy.",
      submitBtn: "Say Hello ;)"
    },
    de: {
      contactMe: 'Kontakt',
      letsWork: "Lass uns <br> zusammenarbeiten",
      gotAProblem: 'Hast du ein Problem zu lösen?',
      info: `Ermutige Menschen, dich zu kontaktieren und beschreibe, für welche Rolle du dich interessierst. Zeige, dass du mit deiner Arbeit einen Mehrwert für ihre Projekte schaffst.<br><br>Brauchst du eine Frontend-Entwicklerin? <span class="green">Lass uns reden!</span>`,
      whatsYourName: "Wie ist dein Name?",
      namePlaceholder: 'Platz für deinen Namen',
      nameWarning: "Ups! Dein Name fehlt noch",
      whatsYourEmail: "Wie lautet deine E-Mail?",
      emailPlaceholder: "dein@email.de",
      emailWarning: "Hoppla! Deine E-Mail fehlt noch",
      howCanIHelp: "Wie kann ich helfen?",
      messagePlaceholder: "Hallo Carla, ich interessiere mich für...",
      messageWarning: "Wobei brauchst du Unterstützung?",
      privacyPolicy: "Ich habe die <a href='privacy-policy' class='policy-link green'>Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten wie beschrieben zu.",
      acceptPolicyWarning: "Bitte akzeptiere die Datenschutzerklärung.",
      submitBtn: "Sag Hallo ;)"
    }
  };

  get t() {
    return this.translations[this.translation.lang()];
  }

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


  // onSubmit(ngForm: NgForm) {
  //   if(ngForm.valid && ngForm.submitted) {
  //     console.log(this.contactData);
  //   }
  // }
  mailTest = false;

  post = {
    endPoint: 'https://carla-hoffmann.net/sendMail.php', // 'https://deineDomain.de/sendMail.php'
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  // checkNameValidity(name: any) {
  //   if (!name.valid && name.touched && !name.disabled) {
  //     this.showNameInput = false;
  //   }
  // }

  onSubmit(ngForm: NgForm) {
    this.formSubmitted = true;

    // Nur das jeweilige Feld ausblenden, wenn es ungültig ist
    if (ngForm.controls['name'] && !ngForm.controls['name'].valid) {
      this.showNameInput = false;
    }
    if (ngForm.controls['email'] && !ngForm.controls['email'].valid) {
      this.showEmailInput = false;
    }
    if (ngForm.controls['message'] && !ngForm.controls['message'].valid) {
      this.showMessageInput = false;
    }

    // Wenn irgendwas ungültig ist, abbrechen
    if (!ngForm.valid) {
      return;
    }

    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => { 
            
            ngForm.resetForm({
              // name: '',
              // email: '',
              // message: '',
              policyAccepted: false
            });
            this.formSubmitted = false;
            this.showNameInput = true;
            this.showEmailInput = true;
            this.showMessageInput = true;
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      console.log('Test mail');
      ngForm.resetForm({
        // name: '',
        // email: '',
        // message: '',
        policyAccepted: false
      });
      this.formSubmitted = false;
      this.showNameInput = true;
      this.showEmailInput = true;
      this.showMessageInput = true;
    }
  }

  triggerShake(field: 'name' | 'email' | 'message') {
    // Setze die Variable auf true, damit die Klasse gesetzt wird
    if (field === 'name') {
      this.shakeName = false;
      setTimeout(() => this.shakeName = true, 0);
      setTimeout(() => this.shakeName = false, 200); // Dauer der Animation
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
    // Setze die Variable auf true, damit die Klasse gesetzt wird
    if (field === 'name') {
      this.shakeName = false;
      setTimeout(() => this.shakeName = true, 0);
      setTimeout(() => this.shakeName = false, 50); // Dauer der Animation
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
