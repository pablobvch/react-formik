import React, { useState } from "react";
import {
  ErrorMessage,
  FastField,
  Field,
  FieldArray,
  Form,
  Formik
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: ""
  },
  phoneNumbers: ["", ""],
  phNumbers: [""]
};

const savedValues = {
  name: "Pablo Bilevich",
  email: "pablobvch@gmail.com",
  channel: "channel example",
  comments: "comments example",
  address: "Chiclana 20202",
  social: {
    facebook: "",
    twitter: ""
  },
  phoneNumbers: ["", ""],
  phNumbers: ["", ""]
};

const onSubmit = (values, onSubmitProps) => {
  console.log("Form data on Submitting", values);
  console.log("onSubmitProps", onSubmitProps);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required")
  //comments: Yup.string().required("Required") this is a schema validation
});

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

const YoutubeForm = () => {
  // validateOnChange={false} //default true
  // validateOnBlur={false} //default true
  // IMPORTANTE validateOnMount o dirty?????
  // =========================================
  // validateOnMount por si solo, valida cuando el formuario esta inicialmente
  // vacio y necesito deshabilitar el boton submit tomando en cuenta la siguiente
  // propiedad disabled={!formik.isValid}
  // Todo depende del requerimiento.
  // Una alternativa seria usar en el boton submit disabled={!(formik.dirty && formik.isValid)}
  // La segunda opcion obliga al usuario a tener que hacer un cambio en el formulario para
  // que el boton de submit quede habilitado pero solo si los campos requeridos ya vienen con valores
  // por default. Ver video https://www.youtube.com/watch?v=F69AlPc0O8o&list=PLC3y8-rFHvwiPmFbtzEWjESkqBVDbdgGu&index=27
  // para recordar este tema
  const [formValues, setFormValues] = useState(null);
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      //validateOnMount
      enableReinitialize
    >
      {(formik) => {
        console.log("Formik props", formik);
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name"></Field>
              <ErrorMessage name="name" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="email">Email</label>
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
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {({ field, form, meta }) => {
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
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

            <div className="form-control">
              <label htmlFor="">List of Phone Numbers</label>
              <FieldArray name="phNumbers">
                {({
                  push,
                  remove,
                  form: {
                    values: { phNumbers },
                    errors
                  }
                }) => {
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              {" "}
                              -
                            </button>
                          )}
                          <button type="button" onClick={() => push(index)}>
                            {" "}
                            +{" "}
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            <button
              type="button"
              onClick={() => formik.validateField("comments")}
            >
              Validate Comments
            </button>
            <button type="button" onClick={() => formik.validateForm()}>
              Validate All
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldTouched("comments")}
            >
              Visit Comments
            </button>
            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true
                })
              }
            >
              Visit Fields
            </button>
            {/*<button type="submit" disabled={!formik.isValid}>*/}
            <button type="button" onClick={() => setFormValues(savedValues)}>
              Load saved data
            </button>
            <button type="reset">Reset</button>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
      {/* El Form debe estar ACA, no necesariamente utilizar el patron de renderProps*/}
    </Formik>
  );
};

export default YoutubeForm;
