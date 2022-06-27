import * as React from "react";

export default function useMutation(
  url: string
): [
  (data: any) => void,
  { loading: boolean; data: undefined | any; error: undefined | any }
] {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<undefined | any>(undefined);
  const [error, setError] = React.useState<undefined | any>(undefined);

  function mutation(data: any) {}
  return [mutation, { loading, data, error }];
}
