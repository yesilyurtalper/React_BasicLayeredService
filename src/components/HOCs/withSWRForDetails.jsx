import useSWRCustom from "../../services/useSWRCustom";
import { CircularProgress } from "@mui/material";
import Error from "../common/Error";
import classes from "./withSWRForDetails.module.css";
import CustomModal from "../common/CustomModal";
import DetailsActions from "../common/actions/DetailsActions";

export default function withModalForDetails(WrappedComponent, entity) {
  return (props) => {
    const { isValidating, error, data } = useSWRCustom(entity,true);

    return (
      <CustomModal>
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
      </CustomModal>
    );
  };
}
