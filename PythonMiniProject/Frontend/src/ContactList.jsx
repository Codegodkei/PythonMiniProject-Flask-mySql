// ContactList.jsx
import React from "react";

const ContactList = ({ contacts, updateContact, updateCallback }) => {

  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE"
      };
      const response = await fetch(`http://localhost:5000/delete_contact/${id}`, options);
      if (response.ok) {
        updateCallback();
      } else {
        console.log("Failed to Delete");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Contacts</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {contacts.map((contact) => (
    <tr key={contact.id}>
      <td>{contact.first_name}</td>
      <td>{contact.last_name}</td>
      <td>{contact.email}</td>
      <td>
        <button onClick={() => updateContact(contact)}>Update</button>
        <button onClick={() => onDelete(contact.id)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default ContactList;
