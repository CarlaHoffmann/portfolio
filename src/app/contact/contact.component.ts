import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { SlideBtnComponent } from '../slide-btn/slide-btn.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, SlideBtnComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  http = inject(HttpClient);

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

    if (!this.policyAccepted) {
      console.log('policy not accepted:', this.policyAccepted);
      return;
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
}
