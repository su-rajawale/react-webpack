import styles from "./styles.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { offerType } from "./types";
import { listofferProps } from "./types"

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import GetAppIcon from "@mui/icons-material/GetApp";
import { Tooltip } from "@mui/material";

const ListOffers = ({ offers, getOffers, ...rest }: listofferProps) => {
  const deleteOffer = async (id: number) => {
    await axios.delete(`http://localhost:5000/offers/${id}`);
    getOffers();
  };

  const handleActivation = async (id: number) => {
    await axios.get("http://localhost:5000/offers/").then(async (res) => {
      const data: offerType[] = res.data;
      const ofr = data.find((x) => x.id === id);
      if(ofr) {
        if (ofr.activated === true) {
          const dact = { activated: false };
          await axios.patch(`http://localhost:5000/offers/${id}`, dact);
          getOffers();
          toast.warn("Offer Deactivated Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "light",
          });
        } else if (ofr.activated === false) {
          const act = { activated: true };
          await axios.patch(`http://localhost:5000/offers/${id}`, act);
          getOffers();
          toast.success("Offer Activated Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "light",
          });
        }
      }
    });
  };

  const handleDownload = (id: number, file: string) => {
    const pdfLink: string = `${file}`;
    const type: string = pdfLink.split(";")[0].split("/")[1];
    const anchorElement = document.createElement("a");
    const fileName: string = `offer_image_${id}.${type}`;
    anchorElement.href = pdfLink;
    anchorElement.download = fileName;
    anchorElement.click();
  };

  return (
    <div className={styles.offerCard}>
      <div className={styles.offerCardInner}>
        <div className={styles.offerTitle}>
          <h5>List Offers</h5>
        </div>
        <div className={styles.offerList}>
          {offers && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Updated Date</TableCell>
                    <TableCell>Activated</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {offers.map(
                    ({ title, updatedAt, id, activated, file }: offerType, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{`${index + 1}.`}</TableCell>
                        <TableCell>{title}</TableCell>
                        <TableCell>{updatedAt}</TableCell>
                        <TableCell>
                          {activated ? <p>Yes</p> : <p>No</p>}
                        </TableCell>
                        <TableCell className={styles.action}>
                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              onClick={() => deleteOffer(id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title={activated ? "Deactivate" : "Activate"}
                          >
                            <IconButton
                              color="primary"
                              onClick={() => handleActivation(id)}
                            >
                              {activated ? (
                                <BlockIcon />
                              ) : (
                                <CheckCircleOutlineIcon />
                              )}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download">
                            <IconButton
                              color="secondary"
                              onClick={() => handleDownload(id, file)}
                            >
                              {file ? <GetAppIcon /> : null}
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ListOffers;
