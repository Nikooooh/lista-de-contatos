import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeContact, editContact } from "./actions";
import styled from "styled-components";

const ListContainer = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.strong`
  font-size: 18px;
`;

const ContactDetail = styled.p`
  margin-top: 5px;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RemoveButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
`;

const EditButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const EditInput = styled.input`
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

function ContactList() {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  const handleRemove = (id) => {
    dispatch(removeContact(id));
    setEditMode(null);
  };

  const handleEdit = (contact) => {
    setEditMode(contact.id);
    setEditedName(contact.fullName);
    setEditedEmail(contact.email);
    setEditedPhone(contact.phone);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    dispatch(
      editContact(editMode, {
        fullName: editedName,
        email: editedEmail,
        phone: editedPhone,
      })
    );
    setEditMode(null);
  };

  return (
    <ListContainer>
      {contacts.map((contact) => (
        <ListItem key={contact.id}>
          {editMode === contact.id ? (
            <EditForm onSubmit={handleSubmitEdit}>
              <EditInput
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                required
              />
              <EditInput
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
                required
              />
              <EditInput
                type="tel"
                value={editedPhone}
                onChange={(e) => setEditedPhone(e.target.value)}
                required
              />
              <ButtonContainer>
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setEditMode(null)}>
                  Cancelar
                </button>
              </ButtonContainer>
            </EditForm>
          ) : (
            <ContactInfo>
              <div>
                <Name>{contact.fullName}</Name>
                <ContactDetail>Email: {contact.email}</ContactDetail>
                <ContactDetail>Telefone: {contact.phone}</ContactDetail>
              </div>
              <ButtonContainer>
                <RemoveButton onClick={() => handleRemove(contact.id)}>
                  Remover
                </RemoveButton>
                <EditButton onClick={() => handleEdit(contact)}>
                  Editar
                </EditButton>
              </ButtonContainer>
            </ContactInfo>
          )}
        </ListItem>
      ))}
    </ListContainer>
  );
}

export default ContactList;
