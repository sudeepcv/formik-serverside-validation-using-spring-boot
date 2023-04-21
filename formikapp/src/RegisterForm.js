import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const [serverErrors, setServerErrors] = useState({});

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/register ', values);
      console.log('Server response:', response);
      setServerErrors({});
      toast.success('Registration successful');
    } catch (error) {
      console.error('Server error:', error.response);
      if (error.response.data && error.response.data.length > 0) {
        const errors = {};
        error.response.data.forEach((errorItem) => {
          const fieldName = errorItem.field;
          const errorMessage = errorItem.defaultMessage;
          errors[fieldName] = errorMessage;
        });
        setServerErrors(errors);
        toast.error('Please fix the errors and try again');
      } else {
        setServerErrors({ _error: 'Something went wrong. Please try again later.' });
        toast.error('Something went wrong. Please try again later.');
      }
    }
    setSubmitting(false);
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
              <Form className="mx-auto mt-5" style={{ maxWidth: '400px' }}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                  {serverErrors.email && (
                    <div className="text-danger">{serverErrors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field type="password" name="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                  {serverErrors.password && (
                    <div className="text-danger">{serverErrors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Re-enter Password</label>
                  <Field type="password" name="confirmPassword" className="form-control" />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger"
                  />
                  {serverErrors.confirmPassword && (
                    <div className="text-danger">{serverErrors.confirmPassword}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  Register
                </button>
                {serverErrors._error && (
                  <div className="text-danger">{serverErrors._error}</div>
                )}
              </Form>
            )}
          </Formik>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
