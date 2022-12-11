import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';

import { StyledButton, UserRating } from 'components/shared';

import { truncate } from 'helpers';

import NoImage from 'assets/images/noproductimage.png';

import { ProductCardPropsType } from '../types';

const ProductCard: React.FC<ProductCardPropsType> = ({
  product,
  sku,
  serverUrl,
  handleAddToCart
}) => {
  return (
    <Col>
      <Card>
        {sku.images.length > 0 ? (
          <LazyLoadImage
            src={
              sku.images[0].isPublicUrl
                ? sku.images[0].url
                : `${serverUrl}${sku.images[0].url}`
            }
            className="card-img-top vh-35"
            effect="blur"
            alt={sku.images[0].name}
          />
        ) : (
          <Card.Img
            src={NoImage}
            variant="top"
            className="card-img-top vh-35"
            alt="noimage"
          />
        )}
        <Card.Body className="border-bottom">
          <Card.Title className="d-flex justify-content-between text-capitalize mb-3">
            <Link
              to={`${product.id}/sku/${sku.id}`}
              className="text-success text-decoration-none">
              {product.name}
            </Link>
            <span className="fw-bold text-danger">${sku.price}</span>
          </Card.Title>
          <Card.Text className="mb-1 mt-1 fs-0">
            {truncate(product.description)}
          </Card.Text>
        </Card.Body>
        <ListGroup as="ul" variant="flush">
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between text-capitalize text-black">
            <div>
              <UserRating rate={product.averageRating} />
              <span>{product.numOfReviews} Reviews</span>
            </div>
            <span>{product.category.name}</span>
          </ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Text as="div" className="buttons text-end">
            <StyledButton
              className="btn btn-dark text-uppercase px-4 py-2"
              onClick={() => handleAddToCart(product, sku)}>
              Add to Cart
            </StyledButton>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;
