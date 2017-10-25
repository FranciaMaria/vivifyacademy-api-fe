import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './../models/contact.model';
import { Observable, Observer } from 'rxjs';

@Injectable()
export class ContactsService {

  private contacts: Contact[] = [
    new Contact(1, 'John', 'Doe', 'john@example.com'),
    new Contact(2, 'Daniel', 'Ros', 'daniel@example.com'),
    new Contact(3, 'Martin', 'Hess', 'martin@example.com')
  ];
  private idCount: number = 3;

  constructor(private http: HttpClient) { }

  public getContacts()
  {
    return new Observable((o: Observer<any>) => {
      this.http.get('http://localhost:8000/api/contacts').subscribe((contacts: any[]) => {
        contacts.forEach((c) => {
          this.contacts.push(new Contact(c.id, c.first_name, c.last_name, c.email));
          o.next(this.contacts);
        });
      });
      o.next(this.contacts);
      return o.complete();
    });
  }

  public addContact(contact: Contact)
  {
    return new Observable((o: Observer<any>) => {
      /*this.idCount++;
      let c = new Contact(this.idCount, contact.firstName, contact.lastName, contact.email);
      
      this.contacts.push(c);
      o.next(c);
      return o.complete();*/
      this.http.post('http://localhost:8000/api/contacts', {
        'first_name': contact.firstName,
        'last_name': contact.lastName,
        'email': contact.email
      })
      .subscribe((c: any) => {
        let newContact = new Contact(c.id, c.first_name, c.last_name, c.email);
        this.contacts.push(newContact);
        o.next(this.contacts);
        return o.complete();
      });
    });
  }

  public editContact(contact: Contact)
  {
    return new Observable((o: Observer<any>) => {
      /*let existing = this.contacts.filter(c => c.id == contact.id);
      if (existing.length) {
        Object.assign(existing[0], contact);
      }

      o.next(existing);
      return o.complete();*/
      this.http.put('http://localhost:8000/api/contacts/' + contact.id, {
        'first_name': contact.firstName,
        'last_name': contact.lastName,
        'email': contact.email
      })
      .subscribe((c: any) => {
        let newContact = new Contact(c.id, c.first_name, c.last_name, c.email);
        let existing = this.contacts.filter((con) => {
          return con.id == c.id;
        });
      if(existing.length){
          existing[0].firstName = c.firstName,
          existing[0].lastName = c.lastName,
          existing[0].email = c.email;
      }
      o.next(existing[0]);
      return o.complete();
      });
    });
  }

  public removeContact(contact: Contact)
  {
    return new Observable((o: Observer<any>) => {
      this.http.delete('http://localhost:8000/api/contacts/' + contact.id)
      .subscribe((c: any) => {
      const index = this.contacts.indexOf(contact);
      this.contacts.splice(index, 1);

      o.next(index);
      return o.complete();
      });
    });
  }

  public getContactById(id: number)
  {
    return new Observable((o: Observer<any>) => {
      let existing = this.contacts.filter(c => c.id == id);
      if (existing.length) {
        o.next(existing);
        return o.complete();
      } else {
        return o.error('Not found');
      }
    });
  }

}
