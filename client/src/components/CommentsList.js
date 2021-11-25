import { React, useState, useEffect, useCallback } from 'react';
import { ListGroup, ToastContainer, Toast } from 'react-bootstrap';
import useHttp from '../hooks/http.hook';

function CommentsList() {
  const { loading, request } = useHttp();
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  const clearError = (timeout) => setTimeout(() => setError(null), timeout);

  const getComments = useCallback(async () => {
    try {
      const fetched = await request('api/comment', 'GET', null, {});
      setComments(fetched);
    } catch (e) {
      setError('Something went wrong');
      clearError(3000);
    }
  }, [request]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  if (loading) {
    return (
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
    );
  }

  return (
    <>
      <ListGroup variant="flush">
        {!loading &&
          comments.map((post) => {
            return (
              <ListGroup.Item>
                {post.name} | {post.description}
              </ListGroup.Item>
            );
          })}
      </ListGroup>

      {error && (
        <ToastContainer position="top-end">
          <Toast show={error} delay={3000} autohide>
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  );
}

export default CommentsList;
