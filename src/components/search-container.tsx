import { useDispatch, useSelector } from "react-redux";
import { selectFilters } from "@/features/jobs-selectors";
import { setSearch } from "@/features/jobs-slice";
import { Input } from "./ui/input";

const SearchContainer = () => {
    const filters = useSelector(selectFilters);
    const dispatch = useDispatch();
  return (
    <Input
      placeholder="Search by Job ID"
      value={filters.search}
      onChange={(e) => dispatch(setSearch(e.target.value))}
      className="w-96"
    />
  );
};

export default SearchContainer;
