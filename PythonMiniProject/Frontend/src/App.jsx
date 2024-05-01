// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import ContactList from './ContactList';
import ContactForm from './ContactForm';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:5000/contacts");
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      console.log(data); // Log the received data
      setContacts(data.contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };

  const openCreateModal = () => {
    setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    setCurrentContact(contact);
    setIsModalOpen(true);
  };

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  };

  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
      <button onClick={openCreateModal}>Create New Contact</button>
      {isModalOpen &&
        <div className='modal'>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
          </div>
        </div>
      }
    </>
  );
}

export default App;
