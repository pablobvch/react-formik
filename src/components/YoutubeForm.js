import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "Pablo",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: ""
  },
  phoneNumbers: ["", ""]
};

const onSubmit = (values) => {
  console.log("Form data on Submitting", values);
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required")
});

const YoutubeForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name"></Field>
          <ErrorMessage name="name" component={TextError} />
        </div>
        <div className="form-control">
          <label htmlFor="name">Email</label>
          <Field type="email" id="email" name="email"></Field>
          <ErrorMessage name="email">
            {(errorMsg) => <div className="error">{errorMsg}</div>}
          </ErrorMessage>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <Field
            type="text"
            id="channel"
            name="channel"
            placeholder="Youtube channel name"
          ></Field>
          <ErrorMessage name="channel" />
        </div>

        <div className="form-control">
          <label htmlFor="comments">Comments</label>
          <Field as="textarea" id="comments" name="comments" />
        </div>

        <div className="form-control">
          <label htmlFor="address">Address</label>
          <Field name="address">
            {({ field, form, meta }) => {
              console.log("Render props", { field, form, meta });
              return (
                <div>
                  <input type="text" id="address" {...field} />
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
              );
            }}
          </Field>
        </div>

        <div className="form-control">
          <label htmlFor="facebook">Facebook</label>
          <Field type="text" id="facebook" name="social.facebook" />
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter</label>
          <Field type="text" id="twitter" name="social.twitter" />
        </div>

        <div className="form-control">
          <label htmlFor="primaryPh">Primary phone number</label>
          <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
        </div>

        <div className="form-control">
          <label htmlFor="secundaryPh">Secundary phone number</label>
          <Field type="text" id="secundaryPh" name="phoneNumbers[1]" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default YoutubeForm;
