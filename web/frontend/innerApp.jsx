import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShop } from "./store/slices/indexSlice";
import Routes from "./Routes";
import { useAuthenticatedFetch } from "./hooks";
import { callDomainResponse } from "./helpers/function";

export const RoutesInnerApp = () => {
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");
  const authenticatedFetch = useAuthenticatedFetch();
  const dispatch = useDispatch();

  useEffect(() => {
    callDomainResponse(authenticatedFetch).then((domain) =>
      dispatch(setShop(`${domain}`))
    );
  }, []);

  return <Routes pages={pages} />;
};
