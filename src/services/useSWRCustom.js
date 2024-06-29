import { useSelector } from "react-redux";
import { useEffect } from "react";
import { commonActions } from "../store/commonStore";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { useParams } from "react-router-dom";

export default function useSWRCustom(entity, isItem=false, options) {
    const { id } = useParams();
    const relUrl = isItem && id ? `${entity}/id/${id}` : entity;
    const { isValidating, error, data, mutate } = useSWR(
      entity ? relUrl : null, options
    );
    const refresh = useSelector((state) => state.commonStore.refresh);
    const dispatch = useDispatch();

    console.log(entity);

    useEffect(() => {
      if (refresh) {
        mutate();
        dispatch(commonActions.toggleRefresh(false));
      }
    }, [refresh, mutate, dispatch]);

    return {
        isValidating,
        error,
        data,
        mutate
    }
}
