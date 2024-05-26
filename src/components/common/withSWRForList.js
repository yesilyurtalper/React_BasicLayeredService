import useSWR from "swr";
import { CircularProgress } from "@mui/material";
import Error from "./Error";

export default function withSWRForList(WrappedComponent, entity) {
  return (props) => {
    const { isValidating, error, data } = useSWR(entity ? entity : null);

    return (
      <>
        {isValidating && <CircularProgress />}
        {error && <Error result={error} />}
        <WrappedComponent
          {...props}
          data={data}
          isValidating={isValidating}
          error={error}
        ></WrappedComponent>
      </>
    );
  };
}
