import { Form } from "react-router-dom";
import classes from "./withModalForDetails.module.css";
import Modal from "./Modal";
import SubmitCancelActions from "./actions/SubmitCancelActions";

export default function withEmptyForm(WrappedComponent,entity) {
  return (props) => {

    return (
      <Modal>
        <Form method="post" className={classes.details}>
          <WrappedComponent
            {...props}
            method="post"
          ></WrappedComponent>
          <SubmitCancelActions item={entity} method="post"/>
        </Form>
      </Modal>
    );
  };
}
