import { Form } from "react-router-dom";
import classes from "./withSWRForDetails.module.css";
import CustomModal from "../common/CustomModal";
import SubmitCancelActions from "../common/actions/SubmitCancelActions";

export default function withSWRForCreate(WrappedComponent, entity) {
  return (props) => {
    return (
      <CustomModal>
        <Form method="post" className={classes.details}>
          <section className={classes.content}>
            <WrappedComponent {...props} method="post"></WrappedComponent>
          </section>
          <SubmitCancelActions item={entity} method="post" />
        </Form>
      </CustomModal>
    );
  };
}
