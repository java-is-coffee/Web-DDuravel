import { useEffect } from "react";
import MainCategory from "../../components/category/MainCategory";
import ExplorePhotoList from "../../components/grid/explorePhotoList/ExplorePhotoList";
import MainPhoto from "../../components/mainPhoto/MainPhoto";
import exploreContainerStyles from "./ExploreContainer.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

function ExploreContainer() {
  const [tokens] = useSearchParams();
  const navigate = useNavigate();

  //oauth를 통해 들어왔을 경우. param에 토큰들이 저장되어 들어옴
  useEffect(() => {
    const accessToken = tokens.get("access_token");
    const refreshToken = tokens.get("refresh_token");
    // 리프레쉬 토큰조차 없을 경우, 다시 발급받아야함.
    const storedRefreshToken = secureLocalStorage.getItem("refreshToken");
    const storedAccessToken = secureLocalStorage.getItem("accessToken");

    if (accessToken && refreshToken) {
      return () => {
        secureLocalStorage.setItem("accessToken", accessToken);
        secureLocalStorage.setItem("refreshToken", refreshToken);
        navigate("/explore");
      };
    }

    if (storedRefreshToken === null && storedAccessToken === null) {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className={exploreContainerStyles.wrapper}>
      <MainPhoto />

      <MainCategory />

      <ExplorePhotoList />
    </div>
  );
}

export default ExploreContainer;
