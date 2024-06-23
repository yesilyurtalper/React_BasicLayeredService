import { CircularProgress } from "@mui/material";
import Error from "../common/Error";
import useSWRCustom from "../../services/useSWRCustom";

export default function withSWR(WrappedComponent, entity) {
  return (props) => {
    const {isValidating,error,data} = useSWRCustom(entity);
    return (
      <>
        {isValidating && <CircularProgress />}
        {error && <Error result={error} />}
        <WrappedComponent
          {...props}
          data={data}
        ></WrappedComponent>
      </>
    );
  };
}
