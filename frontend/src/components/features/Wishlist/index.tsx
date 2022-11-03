import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { UserRating } from 'components/shared';
import { axiosCreate, axiosError } from 'helpers';
import { IErrorResponse } from 'types';
import { IWishListResponse } from './types';

export default function WishlistPage() {
  const fetchWishlists = async () => {
    const res = await axiosCreate<IWishListResponse>({
      axiosApi: '/wishlist/show-folders'
    });

    const {
      wishlist: { folders }
    } = res as IWishListResponse;

    return folders;
  };

  // Queries
  const {
    data: folders
    // isLoading,
    // isError
  } = useQuery(['wishlists'], fetchWishlists, {
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        axiosError(error as IErrorResponse);
      }
    },
    refetchOnWindowFocus: false
  });

  return (
    <Container>
      <Tab.Container defaultActiveKey={folders ? folders[0].id : ''}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {folders &&
                folders.map((folder) => (
                  <Nav.Item key={folder.id}>
                    <Nav.Link eventKey={folder.id}>{folder.name}</Nav.Link>
                  </Nav.Item>
                ))}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {folders &&
                folders.map((folder) => (
                  <Tab.Pane eventKey={folder.id} key={folder.id}>
                    {folder.items.map((item) => (
                      <Card key={item.product.id} className="mb-3">
                        <Card.Body>
                          <Card.Title className="d-flex justify-content-between text-capitalize mb-3">
                            <Link
                              to={item.product.id}
                              className="text-success text-decoration-none">
                              {item.product.name}
                            </Link>
                            <span className="fw-bold text-danger">
                              ${item.product.price}
                            </span>
                          </Card.Title>
                          <ListGroup as="ul" variant="flush">
                            <ListGroup.Item
                              as="li"
                              className="d-flex justify-content-between text-capitalize text-black">
                              <div>
                                <UserRating rate={item.product.averageRating} />
                                <span>{item.product.numOfReviews} Reviews</span>
                              </div>
                              <Card.Text>
                                Category: {item.product.category}
                              </Card.Text>
                              <Card.Text>
                                Company: {item.product.company}
                              </Card.Text>
                            </ListGroup.Item>
                          </ListGroup>
                        </Card.Body>
                      </Card>
                    ))}
                  </Tab.Pane>
                ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}
