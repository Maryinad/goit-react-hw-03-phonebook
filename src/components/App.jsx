import React, { Component } from 'react';
import { PhoneBook } from './PhoneBook/PhoneBook.jsx';
import { ContactList } from './ContactList/ContactList.jsx';
import { nanoid } from 'nanoid';
import { Filter } from '../components/Filter/Filter.jsx';
import { TitlePhone, TitleCont } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filterTerm: '',
  };

  //обрабатывает то, что возвращает наша форма, дальше через props onAddContact(можем назвать как угодно), передали эту функцию
  addContact = newContact => {
    if (this.state.contacts.some(contact => contact.name === newContact.name)) {
      alert(`Contact ${newContact.name} is already exist`);
    }

    // this.setState({ contacts: [newContact, ...this.state.contacts] });
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
    // console.log(newContact);
  };

  handleFilter = event => {
    this.setState({
      filterTerm: event.target.value,
    });
  };

  deleteContact = contactId => {
    console.log(contactId);
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name
        .toLowerCase()
        .trim()
        .includes(this.state.filterTerm.toLowerCase())
    );
    //передаем пропсами
    return (
      <>
        <TitlePhone>Phonebook</TitlePhone>
        <PhoneBook onAddContact={this.addContact} title="Phonebook" />
        <TitleCont>Contacts</TitleCont>
        <Filter value={this.state.filter} onFilterChange={this.handleFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteBtn={this.deleteContact}
        />
      </>
    );
  }
}
