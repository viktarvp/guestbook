import { React, useState, useEffect, useCallback } from 'react';
import useHttp from '../hooks/http.hook';
import { ListGroup } from 'react-bootstrap';

function CommentsList() {
  const { loading, request } = useHttp();
  const [comments, setComments] = useState([]);

  const getComments = useCallback(async () => {
    try {
      const fetched = await request('api/comment', 'GET', null, {});
      setComments(fetched);
    } catch (e) {}
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
  );
}

export default CommentsList;
