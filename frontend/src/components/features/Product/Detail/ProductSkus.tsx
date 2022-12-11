import { Col, Container, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import ROUTES from 'constant/routes';

import NoImage from 'assets/images/noproductimage.png';

import { IProduct } from '../types';

type PropsTypes = {
  product: IProduct;
};

export default function ProductSkus({ product }: PropsTypes) {
  const serverUrl: string = process.env.REACT_APP_API_ENDPOINT || '';

  return (
    <Container>
      <h3>{product.skuType}:</h3>
      <Row md={3}>
        {product.skus.map((sku, index) => (
          <Col key={index}>
            <NavLink
              to={`${ROUTES.PRODUCTS}/${product.id}/sku/${sku.id}`}
              className="border text-decoration-none">
              {sku.images.length === 0 ? (
                <img className="d-block w-100" src={NoImage} alt="noimages" />
              ) : (
                <img
                  className="d-block w-100"
                  src={
                    sku.images[0].isPublicUrl
                      ? sku.images[0].url
                      : `${serverUrl}${sku.images[0].url}`
                  }
                  alt={`slide-${sku.images[0].name}`}
                />
              )}
            </NavLink>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
