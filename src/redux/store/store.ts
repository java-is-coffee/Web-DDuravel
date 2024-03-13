// store.ts
import { configureStore } from "@reduxjs/toolkit";
import newPostReducers from "../reducers/newPost/newPostReducers";

export const rootReducer = configureStore({
  reducer: {
    newPost: newPostReducers,
  },
});

// RootState 타입을 정의하여, 스토어의 상태 타입을 추론할 수 있도록 합니다.
export type RootState = ReturnType<typeof rootReducer.getState>;

// AppDispatch 타입을 정의하여, 스토어의 dispatch 함수 타입을 설정합니다.
export type AppDispatch = typeof rootReducer.dispatch;
