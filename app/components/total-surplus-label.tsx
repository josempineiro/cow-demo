import { useUserTotalSurplus } from "~/hooks/use-user-total-surplus";

export function TotalSurplusLabel() {
  const { data, isLoading, isError, refetch } = useUserTotalSurplus();
  if (isLoading) {
    return <div>Loading surplus</div>;
  }
  if (isError) {
    return (
      <div>
        <p>Error loading surplus</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }
  return <div>totalSurplus: {data?.totalSurplus}</div>;
}
