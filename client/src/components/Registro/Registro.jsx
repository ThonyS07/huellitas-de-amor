import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "./registro.module.css";
import FormInput from "../FormInput/FormInput";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import validationSchema from "./Validaciones";
import * as Yup from "yup";

const Registro = () => {
  const Navigate = useNavigate();

  const initialValues = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  };

  const dispatchRedux = () => {
    Navigate("/");
  };

  // const basename = "https://huellitas-de-amor-production.up.railway.app";
  const basename = "http://localhost:3001";

  const onSubmit = (values) => {
    axios
      .post(`${basename}/usuario`, values)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "Usuario registrado con éxito",
        });
        dispatchRedux();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error de registro",
          text: "Hubo un error al registrar al usuario",
        });
      });
  };

  return (
    <div className={styles.formcontainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className={styles.tittle}>
              <h1>Registrate</h1>
            </div>
            <div>
              <FormInput
                label="Nombre"
                name="nombre"
                error={errors.nombre}
                placeholder="Nombre"
              />
            </div>
            <div>
              <FormInput
                label="Apellido"
                name="apellido"
                error={errors.apellido}
                placeholder="Apellido"
              />
            </div>
            <div>
              <FormInput
                placeholder="Email"
                label="Email"
                name="email"
                error={errors.email}
              />
            </div>
            <div>
              <FormInput
                placeholder="Contraseña"
                label="Contraseña"
                name="password"
                error={errors.password}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="border border-black text-black hover:bg-slate-100 mt-8 bg-inherit "
              size="lg"
            >
              Registrate
            </Button>
            {/* {registroExitoso && setValues(initialValues)} */}
          </Form>
        )}
      </Formik>
      {/*  */}
    </div>
  );
};

export default Registro;
