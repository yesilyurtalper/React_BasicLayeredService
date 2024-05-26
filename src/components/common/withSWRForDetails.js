import useSWR from "swr";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Error from "./Error";
import classes from "./withSWRForDetails.module.css";
import Modal from "./Modal";
import DetailsActions from "./actions/DetailsActions";

export default function withSWRForDetails(WrappedComponent, entity) {
  return (props) => {
    const { id } = useParams();
    const relUrl = `${entity}/${id ? "id/" + id : ""}`;
    const { isValidating, error, data } = useSWR(entity ? relUrl : null);

    return (
      <Modal>
        <main className={classes.details}>
          <DetailsActions manipulate item={entity} />
          {isValidating && <CircularProgress />}
          {error && <Error result={error} />}
          <section className={classes.content}>
            <WrappedComponent
              {...props}
              data={data}
              isValidating={isValidating}
              error={error}
            ></WrappedComponent>
          </section>
        </main>
      </Modal>
    );
  };
}
