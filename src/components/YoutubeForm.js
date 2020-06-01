import React from "react";
import { useFormik } from "formik";

const initialValues = {
  name: "",
  email: "",
  channel: ""
};

const onSubmit = (values) => {
  console.log("Form data on Submitting", values);
};

const validate = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = "Required";
  }

  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!values.email) {
    errors.email = "Required";
  } else if (!re.test(String(values.email).toLowerCase())) {
    errors.email = "Invalid email format";
  }

  if (!values.channel) {
    errors.channel = "Required";
  }

  console.log("errors", errors);

  return errors;
};

const YoutubeForm = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        onChange={formik.handleChange}
        value={formik.values.name}
      ></input>

      <label htmlFor="name">Email</label>
      <input
        type="email"
        id="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      ></input>

      <label htmlFor="channel">Channel</label>
      <input
        type="text"
        id="channel"
        onChange={formik.handleChange}
        value={formik.values.channel}
      ></input>

      <button type="submit">Submit</button>
    </form>
  );
};

export default YoutubeForm;
