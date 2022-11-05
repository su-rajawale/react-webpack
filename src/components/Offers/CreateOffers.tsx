import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import validator from "@rjsf/validator-ajv6";
import Form from "@rjsf/mui";
import axios from "axios";
import { listofferProps } from "./types";
import { IChangeEvent } from "@rjsf/core";

const CreateOffers = ({getOffers}: listofferProps) => {
  const [offerSchema, setOfferSchema] = useState();
  const [offerUiSchema, setOfferUiSchema] = useState();

  const getSchema = async () => {
    await axios.get("http://localhost:5000/offerSchema").then((res) => {
      setOfferSchema(res.data[0]);
    });
  };

  const getUiSchema = async () => {
    await axios.get("http://localhost:5000/offerUischema").then((res) => {
      setOfferUiSchema(res.data[0]);
    });
  };

  const handleSubmit = async (data: IChangeEvent<any,any>) => {
    const submit = data.formData;
    const date = new Date().toDateString()
    Object.assign(submit, {updatedAt: `${date}`, activated: true})
    await axios.post('http://localhost:5000/offers', submit)
    .then(()=> {
      getOffers()
    })
  };

  useEffect(() => {
    getSchema();
    getUiSchema();
  }, []);

  return (
    <div className={styles.offerCard}>
      <div className={styles.offerCardInner}>
        <div className={styles.offerTitle}>
          <h5>Create Offers</h5>
        </div>
        <div className={styles.offerForm}>
          {offerSchema && offerUiSchema && (
            <Form
              schema={offerSchema}
              uiSchema={offerUiSchema}
              validator={validator}
              // onChange={(data)=> setValues(data)}
              onSubmit={(data) => handleSubmit(data)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateOffers;
