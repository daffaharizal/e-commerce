import React from 'react';

import { ErrorMessage } from '@hookform/error-message';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FieldValues, Path, RegisterOptions, useForm } from 'react-hook-form';

interface IFormOptions extends RegisterOptions {
  type: string;
  label: string;
  placeholder: string;
}

type ModalPropsType<TFormValues> = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  titleInput: string;
  formOptions: Record<string, IFormOptions>;
  handleOnSubmit: (values: TFormValues) => void;
  customFormValidation: (values: TFormValues) => {
    error: boolean;
    msg?: string;
  };
};

const ModalPopup = <TFormValues extends FieldValues>({
  show,
  setShow,
  titleInput,
  formOptions,
  handleOnSubmit,
  customFormValidation
}: ModalPropsType<TFormValues>) => {
  const handleClose = () => setShow(false);

  const {
    register,
    handleSubmit,
    getValues,
    // reset,
    setError,
    formState: { errors },
    clearErrors
  } = useForm<TFormValues>();

  const validateInputs = () => {
    const validate = customFormValidation(getValues());
    if (validate.error) {
      setError('notRegisteredInput' as Path<TFormValues>, {
        type: 'custom',
        message: validate.msg
      });
      return;
    }
  };
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();
    validateInputs();
    void handleSubmit(handleOnSubmit)();
  };

  return (
    <Modal
      show={show}
      size="lg"
      onHide={handleClose}
      backdrop="static"
      keyboard={false}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{titleInput}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.entries(formOptions).map(([k, v], index) => (
            <Form.Group className="mb-3" key={index}>
              {['text', 'number'].includes(v.type) && (
                <>
                  <Form.Label>{v.label}</Form.Label>
                  <Form.Control
                    type={v.type}
                    {...register(k as Path<TFormValues>, v)}
                    placeholder={v.placeholder}
                  />
                </>
              )}
              {v.type === 'checkbox' && (
                <Form.Check
                  type={v.type}
                  {...register(k as Path<TFormValues>, v)}
                  label={v.label}
                />
              )}
            </Form.Group>
          ))}
          <ErrorMessage<Partial<{ name: TFormValues }>>
            errors={errors}
            name="notRegisteredInput"
            render={({ message }) => <p className="text-danger">{message}</p>}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalPopup;
