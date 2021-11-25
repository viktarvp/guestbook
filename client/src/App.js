import InputComment from './components/InputComment';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <div className="GuestBook">
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <h1 class="text-center">Guest book</h1>
            <InputComment />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
