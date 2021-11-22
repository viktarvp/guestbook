import React, { useState } from 'react';
import useHttp from '../hooks/http.hook';
import { Form, Button, ToastContainer, Toast } from 'react-bootstrap';
import CommentsList from './CommentsList';

function InputForm(props) {
  const fieldsStricture = { name: '', description: '' };
  const [inputs, setInputs] = useState(fieldsStricture);
  const [errors, setErrors] = useState(fieldsStricture);
  const [validated, setValidated] = useState(false);
  const { loading, request, message, clearMessage } = useHttp();

  const handleInput = async (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regex = /^[\w\d\s_?!.,:;]+$/;
    const isNameCorrect = inputs.name.match(regex) && inputs.name.trim() !== '';
    if (!isNameCorrect) {
      fieldsStricture.name = 'Invalid name';
    }
    const isDescriptionCorrect =
      inputs.description.match(regex) && inputs.description.trim() !== '';
    if (!isDescriptionCorrect) {
      fieldsStricture.description = 'Invalid description';
    }
    setErrors(fieldsStricture);

    if (isNameCorrect && isDescriptionCorrect) {
      setValidated(true);
      await createComment();
    } else {
      setValidated(false);
    }
  };

  const createComment = async () => {
    const { name, description } = inputs;
    try {
      await request('api/comment', 'POST', {
        name,
        description,
        date: Date.now(),
      });
      setInputs({ ...inputs, description: '' });
      setValidated(false);
      clearMessage(3000);
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
            name="name"
            value={inputs.name}
            onChange={(e) => handleInput(e)}
            isInvalid={!!errors.name}
          />
          {errors.name && (
            <ToastContainer position="top-end">
              <Toast show={errors.name}>
                <Toast.Body> {errors.name}</Toast.Body>
              </Toast>
            </ToastContainer>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Control
            as="textarea"
            placeholder="Description"
            rows={3}
            name="description"
            value={inputs.description}
            onChange={(e) => handleInput(e)}
          />
          {errors.description && (
            <ToastContainer position="top-end">
              <Toast show={errors.description}>
                <Toast.Body> {errors.description}</Toast.Body>
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
