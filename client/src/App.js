import CommentsList from './components/CommentsList';
import InputForm from './components/InputForm';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div className="GuestBook">
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <h1 class="text-center">Guest book</h1>
            <InputForm />
            {/* <CommentsList /> */}
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
