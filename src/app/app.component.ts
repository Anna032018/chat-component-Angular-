import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'chat-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chatForm: FormGroup;
  ctrlUser: any;
  placeholder = '';
  messages: any[] = [];
  user = '';
  message = '';
  errMessage = '';

  constructor(private fb: FormBuilder) {
    this.chatForm = fb.group({
      user: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z]+$')
      ])]
    });
    this.ctrlUser = this.chatForm.controls.user;
  }


  addPlaceholder() {
    this.placeholder = 'Type something...';
  }

  /*Generation of message */
  generateMessage() {
    // generate message from user
    if (this.addMessage(true)) {
      // generate message from Bot
      this.addMessage();
      this.message = '';
    }
  }

  /**
   * Adding of message
   * @param {boolean} isUser If message valid
   */
  addMessage(isUser?: boolean): boolean {
    if (!this.message) { return false; }

    // check if message is duplicate
    if (isUser && this.messages.find(m => m.text.toLowerCase() === this.message.toLowerCase())) {
      this.errMessage = 'User already asked this question';
      return false;
    }

    this.messages.push({ text: this.message, isUser: isUser});
    return true;
  }

}
