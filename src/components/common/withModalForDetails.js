import useSWRCustom from "../../services/useSWRCustom";
import { CircularProgress } from "@mui/material";
import Error from "./Error";
import classes from "./withModalForDetails.module.css";
import Modal from "./Modal";
import DetailsActions from "./actions/DetailsActions";

export default function withModalForDetails(WrappedComponent, entity) {
  return (props) => {
    const { isValidating, error, data } = useSWRCustom(entity);

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
