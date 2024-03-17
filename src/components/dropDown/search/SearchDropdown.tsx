import { useEffect } from "react";
import ModalOption from "../../../enum/modalOptionTypes";
import { useModal } from "../../../hooks/modal/ModalProvider";
import dropdownStyles from "./SearchDropdown.module.css";

function SearchDropdown() {
  const { closeModal } = useModal();
  // const FormComponent = formComponents[postFormIndex];
  // Esc 눌렀을때 모달 탈출
  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeModal(ModalOption.SEARCH);
    }
  };
  // 모달 바깥쪽 눌렀을떄 모달 탈출
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal(ModalOption.SEARCH);
    }
  };
  // 컴포넌트 랜더링시에 한번만 리스너 추가
  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
    // eslint-disable-next-line
  }, []);
  const category: string[] = [
    "인기게시글",
    "식도락",
    "기차여행",
    "자동차여행",
    "도보여행",
    "포토스팟",
    "도시경관",
    "자연",
  ];
  const local: string[] = [
    "서울",
    "경기",
    "인천",
    "강원",
    "제주",
    "대전",
    "충북",
    "충남/세종",
    "부산",
    "울산",
    "경남",
    "대구",
    "경북",
    "광주",
    "전남",
    "전주/전북",
  ];

  return (
    <div className={dropdownStyles.outSide} onClick={handleBackdropClick}>
      <div className={dropdownStyles.wrapper}>
        {/* 정렬 및 첫 줄 */}
        <div className={dropdownStyles.head}>
          필터
          <span>X</span>
        </div>
        <div className={dropdownStyles.line}></div>

        {/* 정렬  */}
        <div className={dropdownStyles.option}>
          <div className={dropdownStyles.title}>정렬</div>
          <div className={dropdownStyles.list}>
            <div className={dropdownStyles.item}>
              <span>최신순</span>
            </div>
            <div className={dropdownStyles.item}>
              <span>인기순</span>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <div className={dropdownStyles.line}></div>

        <div className={dropdownStyles.option}>
          <div className={dropdownStyles.title}>카테고리</div>
          <div className={dropdownStyles.list}>
            {category.map((item) => (
              <div className={dropdownStyles.item} key={item}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 구분선 */}
        <div className={dropdownStyles.line}></div>
        <div className={dropdownStyles.option}>
          <div className={dropdownStyles.title}>지역</div>
          <div className={dropdownStyles.list}>
            {local.map((item) => (
              <div className={dropdownStyles.item} key={item}>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchDropdown;
