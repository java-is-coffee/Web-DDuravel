import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSearchParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { RecentDTO } from "components/header/mobile/MobileHeader";
import ModalOption from "enum/modalOptionTypes";
import { useModal } from "hooks/modal/ModalProvider";
import styles from "./HeaderSearch.module.css";
import { setExplorePostList } from "../../../redux/reducers/explore/explorePostReducer";
import useExploreHooks from "hooks/explore/useExploreHooks";

const HeaderSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useSearchParams();
  const [recentData, setRecentData] = useState<RecentDTO[]>([]);
  const { closeModal } = useModal();
  const { setItem } = useExploreHooks();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newData: RecentDTO = {
      id: Date.now(),
      data: searchInput,
    };
    const newList = [newData, ...recentData];

    setRecentData(newList);
    if (newList.length > 5) {
      deleteData(recentData[4].id);
    }

    localStorage.setItem("recentData", JSON.stringify(newList));

    query.set("search", searchInput);
    setQuery(query);
    setItem(setExplorePostList(null));
    closeModal(ModalOption.SEARCH);
  };

  useEffect(() => {
    const result = localStorage.getItem("recentData") || "[]";
    setRecentData(JSON.parse(result));
  }, []);

  const deleteData = (selectedId: number) => {
    const deletedData = recentData.filter((item) => item.id !== selectedId);
    localStorage.setItem("recentData", JSON.stringify(deletedData));
    setRecentData(deletedData);
  };

  return (
    <div>
      <form method="get" action="/explore" onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          name="searchInput"
          placeholder="ex)도보여행, #글램핑, #빵지순례"
          fullWidth
          value={searchInput}
          onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
            setSearchInput(value.target.value);
          }}
          required
          autoComplete="off"
          sx={{
            ".MuiOutlinedInput-root": { fontSize: "1.3rem" },
            width: "20vw",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  type="submit"
                  edge="end"
                  sx={{
                    backgroundColor: "#13c4a3",
                    marginRight: "-1px",
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>

      <div>
        <h2>최근 검색어</h2>
        {recentData.map((item) => (
          <div key={item.id} className={styles.recentList}>
            {item.data}
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => deleteData(item.id)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSearch;
