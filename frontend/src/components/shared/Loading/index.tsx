import { Container, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingSpinner() {
  return (
    <Container>
      <Row>
        <Spinner animation="grow" variant="info" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Row>
    </Container>
  );
}
