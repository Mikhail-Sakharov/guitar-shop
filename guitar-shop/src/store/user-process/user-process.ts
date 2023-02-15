import {createSlice} from "@reduxjs/toolkit";
import {AuthorizationStatus, NameSpace} from "../../const";
import {checkAuthAction} from "../api-actons";

type UserProcess = {
  authorizationStatus: AuthorizationStatus
};

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
