import React, { useState, useEffect } from 'react';
import useHttp from '../hooks/http.hook';
import { Form, Button } from 'react-bootstrap';
import CommentsList from './CommentsList';

function InputForm(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const { loading, request } = useHttp();

  useEffect(() => {
    if (name.trim() === '') {
      return `${name} is required`;
    }

    // if (name !== '') {
    //   if (name.match(/[a-zA-Z_]/)) {
    //     setIsNameValid(false);
    //     console.log('isNameValid1', name, isNameValid);
    //   } else {
    //     setIsNameValid(true);
    //     console.log('isNameValid2', name, isNameValid);
    //   }
    // } else {
    //   setIsNameValid(false);
    //   console.log('isNameValid1', name, isNameValid);
    // }
  }, [name, isNameValid]);

  const createComment = async () => {
    try {
      await request('api/comment', 'POST', {
        name,
        description,
        date: Date.now(),
      });
    } catch (e) {}
  };

  return (
    <>
      <Form className="my-5">
        <Form.Label>Leave you comment</Form.Label>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control
            type="text"
            placeholder="Name"
            inputRef={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Control
            as="textarea"
            placeholder="Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          value="Submit"
          onClick={() => {
            createComment();
          }}
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
