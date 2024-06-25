import Error from "../common/Error";
import useSWRCustom from "../../services/useSWRCustom";
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { eventActions } from "../../store/eventStore";
import { useCallback } from "react";

export default function withSWRGrid(Grid, entity) {
  return (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const query = useSelector((state) =>
      entity === "events"
        ? state.eventStore.query
        : state.postStore.query
    );
    const key = 
    const { isValidating, error, data } = useSWRCustom(entity);

    const handlePaginationChange = useCallback(
      (newModel) => {
        if (newModel.page > paginationModel.page)
          submit(
            { ...queryInput, LastId: events[events.length - 1].id },
            { method: "post" }
          );
        else if (newModel.page < paginationModel.page)
          submit({ ...queryInput, FirstId: events[0].id }, { method: "post" });
        dispatch(eventActions.setPaginationModel(newModel));
      },
      [queryInput]
    );

    return (
      <>
        {error && <Error result={error} />}
        <Grid
          {...props}
          data={data}
          loading={isValidating}
          totalCount={totalCount}
          paginationModel={paginationModel}
          onPaginationChange={handlePaginationChange}
          onRowDoubleClick={(id) => navigate("id/" + id)}
        />
      </>
    );
  };
}
