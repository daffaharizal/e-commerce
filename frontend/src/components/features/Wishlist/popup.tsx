import React from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import { SelectInput, StyledButton } from 'components/shared';

import { QueryConsumer } from 'context';

import { axiosCreate, axiosError } from 'helpers';

import { IErrorResponse, IReactSelectOption } from 'types';

import {
  IWishListResponse,
  IWistListAddItemProps,
  IWistListAddItemResponse
} from './types';

export default function WishlistPopup({ productId }: { productId: string }) {
  const [modalShow, setModalShow] = React.useState(false);

  // Access the client
  const queryClient = QueryConsumer();

  const fetchFolders = async () => {
    const res = await axiosCreate<IWishListResponse>({
      axiosApi: '/wishlist/show-folders'
    });
    const { wishlist } = res as IWishListResponse;
    return wishlist;
  };

  // Queries
  const { data } = useQuery(['wishlistFolders'], fetchFolders, {
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        axiosError(error as IErrorResponse);
      }
    },
    refetchOnWindowFocus: false
  });

  const addItem = async (axiosData: IWistListAddItemProps) => {
    return await axiosCreate<IWistListAddItemResponse>({
      axiosApi: '/wishlist/add-item',
      axiosMethod: 'POST',
      axiosData
    });
  };

  // Mutations
  const mutation = useMutation(addItem, {
    onSuccess: async () => {
      // Invalidate and refetch
      await queryClient.invalidateQueries(['wishlistFolders']);
      toast('🚀 Product added to Wishlist!');
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        axiosError(error as IErrorResponse);
      }
    }
  });

  const handleCreate = (label: string) => {
    handleChange({ label, value: '' });
  };

  const handleChange = (option: IReactSelectOption | null) => {
    if (option) {
      mutation.mutate({
        folderId: option?.value || '',
        folderName: option?.label || '',
        productId
      });
      setModalShow(false);
    }
  };

  const selectOptions =
    data?.folders?.map(({ name: label, id: value }) => ({
      label,
      value
    })) || [];

  return (
    <>
      <StyledButton
        className="btn btn-outline-dark mx-3 px-4"
        onClick={() => setModalShow(true)}>
        Add to Wishlist
      </StyledButton>
      <Modal
        show={modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Wishlist Items
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              {data && <Form.Label>Wishlists</Form.Label>}
              <SelectInput
                options={selectOptions}
                handleCreate={handleCreate}
                handleChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
