import InputForm from './components/InputForm';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <div className="GuestBook">
      <Container>
        <Row>
          <Col></Col>
          <Col xs={6}>
            <h1 class="text-center">Guest book</h1>
            <InputForm />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
