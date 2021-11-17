import React, { useState } from 'react';
import useHttp from '../hooks/http.hook';
import { Form, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import CommentsList from './CommentsList';
import './inputForm.css';

function InputForm(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [validated, setValidated] = useState(false);
  const [errorName, setErrorName] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const { loading, request } = useHttp();

  const handleName = async (e) => {
    setName(e.target.value);
    setErrorName('');
  };

  const handleDescription = async (e) => {
    setDescription(e.target.value);
    setErrorDescription('');
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
        <Form.Group className="mb-5" controlId="formBasicName">
          <Form.Control
            type="text"
            placeholder="Name"
            inputRef={name}
            onChange={handleName}
            isInvalid={!!errorName}
          />
          {errorName && (
            <Alert variant="danger" className="alert">
              {errorName}
            </Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-5" controlId="formBasicDescription">
          <Form.Control
            as="textarea"
            placeholder="Description"
            rows={3}
            value={description}
            onChange={handleDescription}
          />
          {errorDescription && (
            <Alert variant="danger">{errorDescription}</Alert>
          )}
        </Form.Group>
        <Button
          id="btn"
          variant="primary"
          type="submit"
          value="Submit"
          disabled={loading}
        >
          Submit
        </Button>
        {!loading && <CommentsList />}
      </Form>
    </>
  );
}

export default InputForm;
