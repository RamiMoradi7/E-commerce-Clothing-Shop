import {
  ActionCreatorWithOptionalPayload,
  PayloadActionCreator,
} from "@reduxjs/toolkit";
import axios from "axios";
import { AppState } from "../Redux/AppState";
import { appStore } from "../Redux/Store";
import { appConfig } from "../Utils/AppConfig";

interface CommonKeys {
  _id: string;
}

interface Actions<T> {
  setAll: ActionCreatorWithOptionalPayload<T[]>;
  addItem: PayloadActionCreator<T>;
  updateItem: PayloadActionCreator<T>;
  deleteItem: PayloadActionCreator<string>;
}

export class GenericService<T extends CommonKeys> {
  private readonly key?: keyof AppState;
  private readonly baseUrl: string;
  private readonly actions?: Actions<T>;

  public constructor(
    baseUrl: string,
    key?: keyof AppState,
    actions?: Actions<T>
  ) {
    this.baseUrl = baseUrl;
    this.key = key;
    this.actions = actions;
    this.getAll = this.getAll.bind(this);
    this.addOne = this.addOne.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }

  public async getAll(): Promise<T[]> {
    let values = appStore.getState()[this.key] as unknown as T[];
    if (values && values.length > 0) {
      return values;
    }
    const response = await axios.get<T[]>(this.baseUrl);
    values = response.data as T[];
    appStore.dispatch(this.actions.setAll(values));
    return values;
  }

  public async getOne(_id: string): Promise<T> {
    let values = appStore.getState()[this.key] as unknown as T[];
    let value = values.find((v) => v._id === _id);
    if (value) return value;
    const response = await axios.get<T>(`${this.baseUrl + _id}`);
    value = response.data;
    return value;
  }

  public async addOne(value: T): Promise<void> {
    const formData = this.convertDataToFormData(value);
    const response = await axios.post<T>(
      this.baseUrl,
      formData,
      appConfig.axiosOptions
    );
    const addedValue = response.data;
    appStore.dispatch(this.actions.addItem(addedValue));
  }

  public async updateOne(value: T): Promise<void> {
    const formData = this.convertDataToFormData(value);
    const response = await axios.put<T>(this.baseUrl + value._id, formData);
    const updatedValue = response.data;
    console.log("updatedGeneric", updatedValue);
    appStore.dispatch(this.actions.updateItem(updatedValue));
  }
  public async deleteOne(_id: string): Promise<void> {
    await axios.delete<T>(this.baseUrl + _id);
    appStore.dispatch(this.actions.deleteItem(_id));
  }
  private convertDataToFormData(data: T) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (Array.isArray(val)) {
        val.forEach((v) => {
          formData.append(key, v._id);
        });
      } else {
        formData.append(key as keyof T & string, val as string | Blob);
      }
    });
    return formData;
  }
}
