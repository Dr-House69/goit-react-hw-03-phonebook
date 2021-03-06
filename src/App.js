import React, { Component } from "react";
import { nanoid } from "nanoid";
import ContactsForm from "./components/ContactsForm/ContactsForm";
import ContactsList from "./components/ContactsList/ContactsList";
import Filter from "./components/Filter/Filter";
import "./App.scss";

const WrapperPhonebook = ["WrapperPhonebook"];

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem("contacts", JSON.stringify(nextContacts));
    }
  }

  addNewContact = ({ name, number }) => {
    const { contacts } = this.state;
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    contacts.find(
      (contact) => newContact.name.toLowerCase() === contact.name.toLowerCase()
    )
      ? alert(`${newContact.name} is already in contacts`)
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };

  deleteContact = (contactId) => {
    this.setState((previousState) => ({
      contacts: previousState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  handleChangeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const filtered = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filtered)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={WrapperPhonebook}>
        <h1>Phonebook</h1>
        <ContactsForm onSubmit={this.addNewContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleChangeFilter} />
        <ContactsList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
