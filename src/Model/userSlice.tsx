import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userSliceInterface } from "./utils";
import supabase from "./supabase";
import Controllers from "../Controller";
import shortUUID from "short-uuid";
const { showNotification } = Controllers;
// initial state
const initialState: userSliceInterface = {
  isLoading: false,
  register: {
    firstname: "",
    contact: "",
    password: "",
    lastname: "",
    email: "",
  },
  login: { email: "", password: "" },
  user: {},
  isAuthenticated: false,
  transaction: {
    accountName: "",
    accountNumber: "",
    pin: "",
    amount: "",
    remarks: "",
    id: "",
  },
  transactionList: [],
};
// Authentication

// user creation
export const RegisterUser = createAsyncThunk(
  "registerUser",
  async (_, thunkAPI) => {
    // @ts-ignore
    const { register } = thunkAPI.getState().userSlice;

    const accountNumber: number = +register.contact;
    const registerObj = {
      ...register,
      accountBalance: 1000,
      accountNumber,
      isActive: true,
    };

    const { data, error } = await supabase
      .from("user")
      .insert([registerObj])
      .select()
      .single();
    if (data) {
      return data;
    }
  }
);

// user update
export const UserUpdateRemote = createAsyncThunk(
  "updateUserRemote",
  async (_, thunkAPI) => {
    // @ts-ignore
    const { user } = thunkAPI.getState().userSlice;
    const { data, error } = await supabase
      .from("user")
      .update(user)
      .eq("email", user.email)
      .select()
      .single();

    if (data) return data;
  }
);

// make transaction
export const TransactionRemote = createAsyncThunk(
  "TransactionRemote",
  async (load: any, thunkAPI) => {
    // @ts-ignore
    const { id, amount, remarks } = thunkAPI.getState().userSlice.transaction;
    const { me, you } = load;
    const trans = {
      amount: +amount,
      id,
      sender: me.accountNumber,
      remarks,
      receiver: you.accountNumber,
    };
  
    const sender = { ...me};
    const receipient = { ...you};

    const final = await Promise.allSettled([
      await supabase
        .from("user")
        .update(sender)
        .eq("accountNumber", me.accountNumber)
        .select()
        .single(),
      await supabase
        .from("user")
        .update(receipient)
        .eq("accountNumber", you.accountNumber)
        .select()
        .single(),
      await supabase.from("transaction").insert(trans).select().single(),
    ]);
    // @ts-ignore
    const main = final.map((elem) => elem.value.data);

    return main[0];
  }
);
// fetch Transaction
export const FetchTransaction = createAsyncThunk("FetchTransactions", async (_, thunkAPI:any) => {
    const { accountNumber } = thunkAPI.getState().userSlice.user
    const final = await Promise.allSettled([
      await supabase.from("transaction").select().eq("sender", accountNumber),
      await supabase.from("transaction").select().eq("receiver", accountNumber),
    ]);
    // @ts-ignore
    const main = final.map(elem => elem.value.data).flat(2)
    return main
})

const user: any = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    updateAuthInfo: (state: any, action): any => {
      const { name, value, type } = action.payload;

      state[type][name] = value;
    },

    setAuthUserDefault: (state) => {
      (state.register = {
        firstname: "",
        contact: "",
        password: "",
        lastname: "",
        email: "",
      }),
        (state.login = { email: "", password: "" });
    },
    toggleIsLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = {};
      state.isAuthenticated = false;
    },
    updateUser: (state: any, action) => {
      const { name, value } = action.payload;
      state.user[name] = value;
    },
    updateTransaction: (state: any, action) => {
      const { name, value } = action.payload;
      state.transaction[name] = value;
    },
    setTransactionDefault: (state) => {
      state.transaction = {
        accountName: "",
        accountNumber: "",
        pin: "",
        amount: "",
        remarks: "",
        id: "",
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // @ts-ignore
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(UserUpdateRemote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UserUpdateRemote.fulfilled, (state, action) => {
        // @ts-ignore
        state.user = action.payload;
        state.isLoading = false;
        showNotification("upload successful");
      })
      .addCase(TransactionRemote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(TransactionRemote.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.transaction = {
          accountName: "",
          accountNumber: "",
          pin: "",
          amount: "",
          remarks: "",
          id: shortUUID.generate(),
        };
        showNotification("transfer successfull");
      }).addCase(FetchTransaction.pending, (state, action) => {
          state.isLoading = true
      }).addCase(FetchTransaction.fulfilled, (state, action) => {
          state.transactionList = action.payload
          state.isLoading = false
      })
  },
});

const { reducer: userSlice } = user;
export const userSliceActions = user.actions;
export default userSlice;
