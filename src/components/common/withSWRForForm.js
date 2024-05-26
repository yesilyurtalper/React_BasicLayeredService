import useSWR from "swr";
import { useParams, Form } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Error from "./Error";
import classes from "./withSWRForDetails.module.css";
import Modal from "./Modal";
import SubmitCancelActions from "./actions/SubmitCancelActions";

export default function withSWRForForm(WrappedComponent, entity, method) {
  return (props) => {
    const { id } = useParams();
    const relUrl = `${entity}/${id ? "id/" + id : ""}`;
    const { isValidating, error, data } = useSWR(entity ? relUrl : null);

    return (
      <Modal>
        <Form method={method} className={classes.details}>
          {isValidating && <CircularProgress />}
          {error && <Error result={error} />}
          <section className={classes.content}>
            <WrappedComponent
              {...props}
              data={data}
              method={method}
            ></WrappedComponent>
          </section>
          <SubmitCancelActions item="posts" method={method} />
        </Form>
      </Modal>
    );
  };
}
