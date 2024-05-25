import useSWR from "swr";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Error from "./Error";

export default function withSWR(WrappedComponent, entity) {
  return (props) => {
    const { id } = useParams();
    const relUrl = `${entity}/${id ? "id/" + id : ""}`;
    const { isValidating, error, data } = useSWR(entity ? relUrl : null);

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
