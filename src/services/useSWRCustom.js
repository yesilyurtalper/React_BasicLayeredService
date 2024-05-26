import { useSelector } from "react-redux";
import { useEffect } from "react";
import { commonActions } from "../store/commonStore";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { useParams } from "react-router-dom";

export default function useSWRCustom(entity) {
    const { id } = useParams();
    const relUrl = id ? `${entity}/id/${id}` : entity;
    const { isValidating, error, data, mutate } = useSWR(
      entity ? relUrl : null
    );
    const refresh = useSelector((state) => state.commonStore.refresh);
    const dispatch = useDispatch();

    useEffect(() => {
      if (refresh) {
        mutate();
        dispatch(commonActions.setRefresh(false));
      }
    }, [refresh, mutate, dispatch]);

    return {
        isValidating,
        error,
        data
    }
}
