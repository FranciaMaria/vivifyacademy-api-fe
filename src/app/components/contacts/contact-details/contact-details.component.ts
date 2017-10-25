import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../../shared/services/contacts.service';
import { Contact } from '../../../shared/models/contact.model';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
})
export class ContactDetailsComponent implements OnInit {
  
  private contact: Contact;

  constructor(private route: ActivatedRoute,
              private contactService: ContactsService) {
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      let id = parseInt(this.route.snapshot.paramMap.get('id'));

      this.contactService.getContactById(id)
        .subscribe((contact: Contact) => {
          this.contact = contact;
        });
    });
  }
}
