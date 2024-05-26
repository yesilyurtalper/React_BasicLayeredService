import useSWRCustom from "../../services/useSWRCustom";
import { CircularProgress } from "@mui/material";
import Error from "./Error";
import classes from "./withModalForDetails.module.css";
import Modal from "./Modal";
import SubmitCancelActions from "./actions/SubmitCancelActions";
import { Form } from "react-router-dom";

export default function withModalForForm(WrappedComponent, entity, method) {
  return (props) => {
    const { isValidating, error, data } = useSWRCustom(entity);

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
