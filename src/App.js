import React from "react";
import ContactList from "./ContactList";
import AddContactForm from "./AddContactForm";
import { Provider } from "react-redux";
import store from "./store";
import styled from "styled-components";

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

function App() {
  return (
    <Provider store={store}>
      <AppContainer>
        <Title>Lista de Contatos</Title>
        <AddContactForm />
        <ContactList />
      </AppContainer>
    </Provider>
  );
}

export default App;
