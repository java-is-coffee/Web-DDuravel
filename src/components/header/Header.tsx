import { GoBell } from "react-icons/go";
import headerStyle from "./Header.module.css";
import { Avatar, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";
import useExploreHooks from "hooks/explore/useExploreHooks";
import { GetListDTO } from "interface/explore/ExplorePost";
import { useNavigate } from "react-router-dom";

function Header() {
  // const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const { setPostList } = useExploreHooks();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 20) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };

  //   // 스크롤 이벤트 리스너 추가
  //   window.addEventListener("scroll", handleScroll);

  //   // 컴포넌트 언마운트 시 이벤트 리스너 제거
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // const handleIsScrolled = () => {
  //   setIsScrolled(false);
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const setCategoyList: GetListDTO = {
      paging: 1,
      pagingNumber: 12,
      searchType: "KEYWORD",
      keyword: searchInput,
      sortBy: "RECENT",
      concept: null,
      region: null,
    };

    setPostList(setCategoyList);
  };

  const goMyPage = () => {
    navigate("/my");
  };

  const goExplore = () => {
    navigate("/explore");
  };

  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.navigator}>
        <div className={headerStyle.headerLeft}>
          <div className={headerStyle.logoWrapper}>
            <span className={headerStyle.logo}>PolaRoad</span>
          </div>
          <div className={headerStyle.action}>
            <span onClick={goExplore}>Home</span>
            <span>Subscribe</span>
            <span>Map</span>
            <span>New Post</span>
          </div>
        </div>
        <div className={headerStyle.userAction}>
          <div
            className={`${headerStyle.searchToggleWrapper} ${headerStyle.searchVisible}`}
          >
            <form action="post" onSubmit={handleSubmit}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="ex)도보여행, #글램핑, #빵지순례"
                fullWidth
                value={searchInput}
                onChange={(value: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchInput(value.target.value);
                }}
                required
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
                        sx={{ backgroundColor: "#13c4a3", marginRight: "-1px" }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
            {/* <IoSearch size={"20px"} /> */}
          </div>

          <GoBell size={"32px"} />
          <span onClick={goMyPage}>
            <Avatar alt="Travis Howard" src="icons/favicon-32x32.png" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
