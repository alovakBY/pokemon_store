import { createAction } from "redux-actions";

export const GET_CART_ITEMS_REQUEST = createAction("GET_CART_ITEMS_REQUEST");
export const GET_CART_ITEMS_SUCCESS = createAction("GET_CART_ITEMS_SUCCESS");
export const GET_CART_ITEMS_FAIL = createAction("GET_CART_ITEMS_FAIL");

export const SET_CART_ITEM_REQUEST = createAction("SET_CART_ITEM_REQUEST");
export const SET_CART_ITEM_SUCCESS = createAction("SET_CART_ITEM_SUCCESS");
export const SET_CART_ITEM_FAIL = createAction("SET_CART_ITEM_FAIL");

export const UPDATE_CART_ITEM_REQUEST = createAction(
  "UPDATE_CART_ITEM_REQUEST"
);
export const UPDATE_CART_ITEM_SUCCESS = createAction(
  "UPDATE_CART_ITEM_SUCCESS"
);
export const UPDATE_CART_ITEM_FAIL = createAction("UPDATE_CART_ITEM_FAIL");

export const DELETE_CART_ITEM_REQUEST = createAction(
  "DELETE_CART_ITEM_REQUEST"
);
export const DELETE_CART_ITEM_SUCCESS = createAction(
  "DELETE_CART_ITEM_SUCCESS"
);
export const DELETE_CART_ITEM_FAIL = createAction("DELETE_CART_ITEM_FAIL");
