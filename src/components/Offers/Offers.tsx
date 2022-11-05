import React from "react";
import { useState, useEffect } from "react";
import CreateOffers from "./CreateOffers";
import ListOffers from "./ListOffers";
import styles from "./styles.module.css";
import axios from 'axios'
import { offerType } from "./types";

const Offers = () => {
  const [offers, setOffers] = useState<offerType[] | undefined>();

  const getOffers = async () => {
    await axios.get("http://localhost:5000/offers").then((res) => {
      setOffers(res.data);
    });
  };

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <div className={`${styles.offers}`}>
      <div className={styles.create}>
        <CreateOffers getOffers={getOffers} />
      </div>
      <div className={styles.list}>
        <ListOffers offers={offers} getOffers={getOffers} />
      </div>
    </div>
  );
};

export default Offers;
