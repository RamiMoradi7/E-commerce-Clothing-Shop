import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";

interface EntityWithId {
  _id?: string;
  loading?: boolean;
}

export default function createGenericSlice<T extends EntityWithId>(
  sliceName: string,
  initialState: T[]
) {
  const slice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
      setAll(state, action: PayloadAction<T[]>) {
        return action.payload;
      },
      addItem(state, action: PayloadAction<T>) {
        state.push(action.payload as Draft<T>);
      },
      updateItem(state, action: PayloadAction<T>) {
        const index = state.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state[index] = action.payload as Draft<T>;
        }
      },
      deleteItem(state, action: PayloadAction<string>) {
        const itemToDelete = state.findIndex(
          (item) => item._id === action.payload
        );
        if (itemToDelete !== -1) {
          state.splice(itemToDelete, 1);
        }
      },
    },
  });
  return slice;
}
