import { useLocation, useNavigate } from "react-router-dom";
import _ from "lodash";
export const useSearchNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const setSearchParam = _.debounce(
    (key: string, value: string | string[], searchParam?: string) => {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          searchParams.delete(key);
        } else {
          value.forEach((v) => {
            searchParams.append(key, v);
          });
        }
      } else {
        if (value.trim() === "") {
          searchParams.delete(key);
        } else {
          searchParams.set(key, value);
        }
      }
      navigate(
        `${
          searchParam ? searchParam : location.pathname
        }?${searchParams.toString()}`
      );
    },
    500
  );

  return { setSearchParam };
};
