import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import { StyledButton } from 'components/shared';
import { QueryConsumer } from 'context';
import { callAxios, axiosError } from 'helpers';
import { IErrorResponse } from 'types';
import {
  IWishListResponse,
  IWistListAddItemProps,
  IWistListAddItemResponse
} from './types';

export default function WishListFolderModal({
  productId
}: {
  productId: string;
}) {
  const [modalShow, setModalShow] = React.useState(false);
  const [folderData, setFolderData] = React.useState({
    folderId: '',
    folderName: ''
  });

  const fetchFolders = async () => {
    const res = await callAxios<IWishListResponse>({
      axiosApi: '/wishlist/show-folders'
    });
    const {
      wishlist: { folders }
    } = res as IWishListResponse;

    return folders;
  };

  const addItem = async (axiosData: IWistListAddItemProps) => {
    return await callAxios<IWistListAddItemResponse>({
      axiosApi: '/wishlist/add-item',
      axiosMethod: 'POST',
      axiosData
    });
  };

  // Access the client
  const queryClient = QueryConsumer();

  // Queries
  const { data } = useQuery(['wishlistFolders'], fetchFolders, {
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        axiosError(error as IErrorResponse);
      }
    },
    refetchOnWindowFocus: false
  });

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

  const handleSubmit = () => {
    mutation.mutate({ ...folderData, productId });
    setModalShow(false);
    setFolderData({
      folderId: '',
      folderName: ''
    });
  };

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
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Wishlist Items
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted">Existing Lists</Form.Label>
              {data &&
                data.map((folder) => (
                  <Form.Check
                    type="radio"
                    id={`default-${folder.id}`}
                    label={folder.name}
                    name="folder"
                    value={folder.id}
                    key={folder.id}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                      setFolderData({
                        folderId: e.target.value,
                        folderName: ''
                      })
                    }
                  />
                ))}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="text-muted">OR Create New List</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a new list name"
                value={folderData.folderName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                  setFolderData({
                    folderId: '',
                    folderName: e.target.value
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <Button onClick={() => setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
