import useSWRCustom from "../../services/useSWRCustom";
import { CircularProgress } from "@mui/material";
import Error from "../common/Error";
import classes from "./withSWRForDetails.module.css";
import CustomModal from "../common/CustomModal";
import SubmitCancelActions from "../common/actions/SubmitCancelActions";
import { Form } from "react-router-dom";

export default function withSWRForUpdate(WrappedComponent, entity, method) {
  return (props) => {
    const { isValidating, error, data } = useSWRCustom(entity,true);

    return (
      <CustomModal>
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
      </CustomModal>
    );
  };
}
