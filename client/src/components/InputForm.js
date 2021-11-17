import React, { useState } from 'react';
import useHttp from '../hooks/http.hook';
import { Form, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import CommentsList from './CommentsList';

function InputForm(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});
  const { loading, request } = useHttp();

  const handleName = async (e) => {
    setName(e.target.value);
    setErrors({});
  };

  const handleDescription = async (e) => {
    setDescription(e.target.value);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    setErrors(errors);

    const regex = /^[a-zA-Z0-9_ .-]*$/;
    if (!name.match(regex) || name.trim() === '') {
      errors.name = 'Invalid name';
    }
    if (!description.match(regex) || description.trim() === '') {
      errors.description = 'Invalid description';
    }

    if (errors.name || errors.description) {
      setErrors(errors);
      setValidated(false);
    } else {
      setValidated(true);
      createComment();
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
            isInvalid={!!errors.name}
          />
          {errors.name && <Alert variant="danger">{errors.name}</Alert>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Control
            as="textarea"
            placeholder="Description"
            rows={3}
            value={description}
            onChange={handleDescription}
          />
          {errors.description && (
            <Alert variant="danger">{errors.description}</Alert>
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
