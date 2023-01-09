import React from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { ModalPopup, Spinner, StyledButton } from 'components/shared';

import { QueryConsumer } from 'context';

import { axiosCreate, axiosError } from 'helpers';

import { IErrorResponse } from 'types';

type AddressDataType = {
  fullName: string;
  street1: string;
  street2: string;
  city: string;
  province: string;
  zip: number;
  country: string;
  isBilling: boolean;
  isShipping: boolean;
  id: string;
  notRegisteredInput: string;
};

type AddressResponseType = {
  user: {
    billingAddress: Omit<AddressDataType, 'notRegisteredInput'>[];
    shippingAddress: Omit<AddressDataType, 'notRegisteredInput'>[];
  };
};

export default function AddressPage() {
  const [modalShow, setModalShow] = React.useState(false);

  const getAddresses = async () => {
    const res = await axiosCreate<AddressResponseType>({
      axiosApi: '/users/showme'
    });
    const {
      user: { billingAddress, shippingAddress }
    } = res as AddressResponseType;

    return { billingAddress, shippingAddress };
  };

  // Queries
  const {
    data,
    isLoading: isQueryLoading,
    isError
  } = useQuery(['showme'], getAddresses, {
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        axiosError(error as IErrorResponse);
      }
    },
    refetchOnWindowFocus: false
  });

  // Access the client
  const queryClient = QueryConsumer();

  const createAddress = async (axiosData: Omit<AddressDataType, 'id'>) => {
    return await axiosCreate({
      axiosApi: '/users/create-address',
      axiosMethod: 'POST',
      axiosData
    });
  };

  // Mutations
  const { mutate } = useMutation(createAddress, {
    onSuccess: async () => {
      // Invalidate and refetch
      await queryClient.invalidateQueries(['showme']);
      toast('🚀 New Address added!');
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        axiosError(error as IErrorResponse);
      }
    }
  });

  const handleOnSubmit: SubmitHandler<Omit<AddressDataType, 'id'>> = (
    values
  ) => {
    mutate(values);
  };

  const customFormValidation = (values: Omit<AddressDataType, 'id'>) => {
    return values.isBilling || values.isShipping
      ? { error: false }
      : {
          error: true,
          msg: 'Please select atleast Billing or Shipping Checkbox field'
        };
  };

  const addressFormOptions = {
    fullName: {
      label: 'Full Name',
      type: 'text',
      placeholder: 'Enter Full Name',
      required: 'This is required',
      minLength: { value: 3, message: 'Min length is 3' },
      maxLength: { value: 50, message: 'Max length is 50' }
    },
    street1: {
      label: 'Address Line 1',
      type: 'text',
      placeholder: 'Address Line 1',
      required: 'This is required',
      maxLength: { value: 32, message: 'Max length is 32' }
    },
    street2: {
      label: 'Address Line 2',
      type: 'text',
      placeholder: 'Address Line 2',
      maxLength: { value: 32, message: 'Max length is 32' }
    },
    city: {
      label: 'City / Town',
      type: 'text',
      placeholder: 'City / Town',
      required: 'This is required',
      maxLength: { value: 32, message: 'Max length is 32' }
    },
    province: {
      label: 'State / Province / Region',
      type: 'text',
      placeholder: 'State / Province / Region',
      required: 'This is required',
      maxLength: { value: 16, message: 'Max length is 32' }
    },
    zip: {
      label: 'Zip / Postal Code',
      type: 'number',
      placeholder: 'Zip / Postal Code',
      required: 'This is required',
      maxLength: { value: 16, message: 'Max length is 16' }
    },
    country: {
      label: 'Country',
      type: 'text',
      placeholder: 'Country',
      required: 'This is required',
      maxLength: { value: 32, message: 'Max length is 32' }
    },
    isBilling: {
      label: 'Is Billing',
      type: 'checkbox',
      placeholder: 'Is Billing'
    },
    isShipping: {
      label: 'Is Shipping',
      type: 'checkbox',
      placeholder: 'Is Shipping'
    }
  };

  if (isQueryLoading) return <Spinner />;
  if (isError) return <span>An Error Occured!</span>;

  return (
    <Container>
      <ModalPopup<Omit<AddressDataType, 'id'>>
        show={modalShow}
        setShow={setModalShow}
        titleInput="Create Address"
        formOptions={addressFormOptions}
        handleOnSubmit={handleOnSubmit}
        customFormValidation={customFormValidation}
      />

      <StyledButton
        className="btn btn-outline-dark mx-3 px-4 float-right"
        onClick={() => setModalShow(true)}>
        Create New
      </StyledButton>
      <Card className="my-4">
        <Card.Header>Billing Address</Card.Header>
        <Card.Body>
          <Row>
            {data &&
              data.billingAddress.map((address, index) => (
                <Col className="col-md-auto" key={index}>
                  <Card className="my-2" style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{address.fullName}</Card.Title>
                      <Card.Text>
                        {address.street1},{' '}
                        {address.street2 && `${address.street2},`}{' '}
                        {address.city}, {address.province}, {address.zip},{' '}
                        {address.country}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            {data?.billingAddress.length === 0 && (
              <p>No Billing Address found.</p>
            )}
          </Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Shipping Address</Card.Header>
        <Card.Body>
          <Row>
            {data &&
              data.shippingAddress.map((address, index) => (
                <Col className="col-md-auto" key={index}>
                  <Card className="my-2" style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{address.fullName}</Card.Title>
                      <Card.Text>
                        {address.street1},{' '}
                        {address.street2 && `${address.street2},`}{' '}
                        {address.city}, {address.province}, {address.zip},{' '}
                        {address.country}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            {data?.shippingAddress.length === 0 && (
              <p>No Shipping Address found.</p>
            )}
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
