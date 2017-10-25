import { Component, EventEmitter, Output } from '@angular/core';
import { Contact } from '../../../shared/models/contact.model';

@Component({
  selector: 'app-contact-form',
  templateUrl: 'contact-form.component.html'
})
export class ContactFormComponent {
  @Output() onSubmit = new EventEmitter<Contact>();

  private newContact: Contact = new Contact();

  constructor() {
  }

  submitContact(contact: Contact) {
    this.onSubmit.emit(contact);
    this.newContact = new Contact();
  }

  edit(contact: Contact) {
    this.newContact = Object.assign({}, contact);
  }

}
