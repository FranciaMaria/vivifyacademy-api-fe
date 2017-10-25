import { Component, Injector } from '@angular/core';
import { ContactsService } from '../../shared/services/contacts.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Contact } from '../../shared/models/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.component.html'
})
export class ContactsComponent {

  private contacts: any[] = [];
  private contactService : ContactsService;

  constructor(private injector: Injector) {
    this.contactService = this.injector.get(ContactsService);
    this.contactService.getContacts().subscribe(
      data => {
        this.contacts = data;
      },
      (err: HttpErrorResponse) => {
        alert(`Backend returned code ${err.status} with message: ${err.error}`);
      }
    );
  }

  remove(contact) {
    this.contactService.removeContact(contact)
        .subscribe();
  }

  submitContact(contact: Contact) {
    if (contact.id) {
      this.contactService.editContact(contact)
        .subscribe();
    } else {
      this.contactService.addContact(contact)
        .subscribe();
    }
  }

}
