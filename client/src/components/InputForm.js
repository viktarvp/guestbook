import React, { useState } from 'react';
import useHttp from '../hooks/http.hook';
import { Form, Button, ToastContainer, Toast } from 'react-bootstrap';
import CommentsList from './CommentsList';

function InputForm(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [validated, setValidated] = useState(false);
  const [errorName, setErrorName] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const { loading, request, message, clearMessage } = useHttp();

  const handleName = async (e) => {
    setName(e.target.value);
    setErrorName('');
    clearMessage('');
  };

  const handleDescription = async (e) => {
    setDescription(e.target.value);
    setErrorDescription('');
    clearMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regex = /^[a-zA-Z0-9_ .-]*$/;
    if (!name.match(regex) || name.trim() === '') {
      setErrorName('Invalid name');
    }
    if (!description.match(regex) || description.trim() === '') {
      setErrorDescription('Invalid description');
    }

    if (errorName || errorDescription) {
      setValidated(false);
    } else {
      setValidated(true);
      await createComment();
    }
  };

  const createComment = async () => {
    try {
      await request('api/comment', 'POST', {
        name,
        description,
        date: Date.now(),
      });
      setDescription('');
    } catch (e) {}
  };

  return (
    <>
      <Form className="my-5" validated={validated} onSubmit={handleSubmit}>
        <Form.Label>Leave you comment</Form.Label>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control
            type="text"
            placeholder="Name"
            inputRef={name}
            onChange={handleName}
            isInvalid={!!errorName}
          />
          {errorName && (
            <ToastContainer position="top-end">
              <Toast show={errorName}>
                <Toast.Body> {errorName}</Toast.Body>
              </Toast>
            </ToastContainer>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Control
            as="textarea"
            placeholder="Description"
            rows={3}
            value={description}
            onChange={handleDescription}
          />
          {errorDescription && (
            <ToastContainer position="top-end">
              <Toast show={errorDescription}>
                <Toast.Body> {errorDescription}</Toast.Body>
              </Toast>
            </ToastContainer>
          )}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          value="Submit"
          disabled={loading}
        >
          Submit
        </Button>
        {message && (
          <ToastContainer position="top-end">
            <Toast show={message} delay={3000} autohide>
              <Toast.Body>{message}</Toast.Body>
            </Toast>
          </ToastContainer>
        )}
      </Form>
      {!loading && <CommentsList />}
    </>
  );
}

export default InputForm;
