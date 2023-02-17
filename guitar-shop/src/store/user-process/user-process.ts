import {createSlice} from "@reduxjs/toolkit";
import {AuthorizationStatus, NameSpace} from "../../const";
import {UserRole} from "../../types/user-role.enum";
import {checkAuthAction, loginUserAction, registerUserAction} from "../api-actions";

type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userData: {
    userName: string | null;
    email: string | null;
    userRole: UserRole | null;
  }
};

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {
    userName: null,
    email: null,
    userRole: null
  }
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUserAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(registerUserAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        const userData = JSON.parse(JSON.stringify(action.payload));
        delete userData.token;
        state.userData = userData;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginUserAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
