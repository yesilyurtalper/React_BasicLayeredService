import Error from "../common/Error";
import useSWRCustom from "../../services/useSWRCustom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { eventActions } from "../../store/eventStore";
import { postActions } from "../../store/postStore";
import { useEffect } from "react";

export default function withSWRGrid(Grid, entity) {
  return (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const query = useSelector((state) =>
      entity === "events" ? state.eventStore.query : state.postStore.query
    );
    const queryKey = useSelector((state) =>
      entity === "events" ? state.eventStore.queryKey : state.postStore.queryKey
    );
    const sortModel = useSelector((state) =>
      entity === "events" ? state.eventStore.sortModel : state.postStore.sortModel
    );
    const swrMutate = useSelector((state) => state.commonStore.swrMutate);
    const { isValidating, error, data, mutate } = useSWRCustom(
      `${entity}${queryKey}`,
      {
        revalidateOnMount: false,
      }
    );

    useEffect(() => {
      if (queryKey) {
        mutate();
      }
    }, [queryKey, swrMutate, mutate]);

    const handlePaginationChange = (newModel) => {
      console.log(newModel);
      let newPage = {
        page: newModel.page,
        pageSize: newModel.rows,
      };
      entity === "events"
        ? dispatch(eventActions.setQuery(newPage))
        : dispatch(postActions.setQuery(newPage));
    };

    const handleSortChange = (newSort) => {
      console.log(newSort);
      let sortModel = {
        sortField: newSort.sortField,
        sortOrder: newSort.sortOrder,
      };
      entity === "events"
        ? dispatch(eventActions.setSortModel(sortModel))
        : dispatch(postActions.setSortModel(sortModel));
    };

    return (
      <>
        {error && <Error result={error} />}
        <Grid
          {...props}
          items={data?.items ?? []}
          loading={isValidating}
          totalItems={data?.totalItems ?? 0}
          paginationModel={{ page: query.page, pageSize: query.pageSize }}
          sortModel={sortModel}
          onPaginationChange={handlePaginationChange}
          onSortChange={handleSortChange}
          onRowDoubleClick={(id) => navigate("id/" + id)}
        />
      </>
    );
  };
}
