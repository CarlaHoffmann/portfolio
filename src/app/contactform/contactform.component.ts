import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contactform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contactform.component.html',
  styleUrl: './contactform.component.scss'
})
export class ContactformComponent {

  http = inject(HttpClient);

  contactData = {
    name: "",
    email: "",
    message: "",
  }

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

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid && !this.mailTest) {
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => { 
            
            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      console.log('Test mail');
      ngForm.resetForm();
    }
  }
}
