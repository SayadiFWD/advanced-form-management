import React from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios"
import "./styles.css";

function AnimalForm({errors,touched,status}) {
  return (
    <div className="App">

      <Form>
        {touched.species&& errors.species && (
          <p className="error">{errors.species}</p>
        )}

        <Field type="text" name="species" placeholder="Species" />
        {touched.age && errors.age && <p className="error">{errors.age}</p>}
        <Field type="number" name="age" placeholder="Age" />

        {touched.diet && errors.diet && <p className="error">{errors.diet}</p>}
        <Field component="select" name="diet" placeholder="Diet">
          <option value="" disabled>
            Select Diet:
          </option>
          <option value="carnivore">Carnivore</option>
          <option value="herbivore">Herbivore</option>
          <option value="omnivore">Omnivore</option>
        </Field>
        <label>
        {touched.vaccinations && errors.vaccinations && <p className="error">{errors.vaccinations}</p>}
          <Field type="checkbox" name="vaccinations" />
          <span>Vaccination</span>
        </label>
        <Field component="textarea" name="notes" placeholder="Notes" />
        <button>Submit</button>

        Species{status.species}
      </Form>
    </div>
  );
}

export default withFormik({
  mapPropsToValues: (value) => {
    return {
      species: value.species || "",
      age: value.age || "",
      diet: value.diet || "",
      vaccinations: value.vaccinations || "",
      notes: value.notes || "",
    };
  },
  validationSchema: yup.object().shape({
    species: yup.string().required("Must inter a species"),
    age: yup.number().positive().required(),
    diet: yup.string().required(),
    vaccinations: yup.boolean().oneOf([true]).required(),
  }),
  handleSubmit: (value,{setStatus}) => {
   axios.post("https://reqres.in/api/animals",value)
   .then(res=>{
     setStatus(res.data)
   })
   .catch(error=>{
     console.loe(error)
   })
  },
})(AnimalForm);
