import Vue from "vue";
import Vuex from "vuex";

import {
  getMediaRecord,
  getAllMediaRecords,
  createMediaRecord,
  updateMediaRecord,
  deleteMediaRecord
} from "../services/mediaRecordsService";
import transformApiEntity from "../utils/transformApiEntity";

Vue.use(Vuex);

export const GET_MEDIA_RECORDS = "GET_MEDIA_RECORDS";
const GET_MEDIA_RECORDS_START = "GET_MEDIA_RECORDS_START";
const GET_MEDIA_RECORDS_SUCCESS = "GET_MEDIA_RECORDS_SUCCESS";
const GET_MEDIA_RECORDS_ERROR = "GET_MEDIA_RECORDS_ERROR";

export const GET_MEDIA_RECORD = "GET_MEDIA_RECORD";
const GET_MEDIA_RECORD_START = "GET_MEDIA_RECORD_START";
const GET_MEDIA_RECORD_SUCCESS = "GET_MEDIA_RECORD_SUCCESS";
const GET_MEDIA_RECORD_ERROR = "GET_MEDIA_RECORD_ERROR";

export const RESET_GET_MEDIA_RECORD = "RESET_GET_MEDIA_RECORD";

export const POST_MEDIA_RECORD = "POST_MEDIA_RECORD";
const POST_MEDIA_RECORD_START = "POST_MEDIA_RECORD_START";
const POST_MEDIA_RECORD_SUCCESS = "POST_MEDIA_RECORD_SUCCESS";
const POST_MEDIA_RECORD_ERROR = "POST_MEDIA_RECORD_ERROR";

export const PUT_MEDIA_RECORD = "PUT_MEDIA_RECORD";
const PUT_MEDIA_RECORD_START = "PUT_MEDIA_RECORD_START";
const PUT_MEDIA_RECORD_SUCCESS = "PUT_MEDIA_RECORD_SUCCESS";
const PUT_MEDIA_RECORD_ERROR = "PUT_MEDIA_RECORD_ERROR";

export const DELETE_MEDIA_RECORD = "DELETE_MEDIA_RECORD";
const DELETE_MEDIA_RECORD_START = "DELETE_MEDIA_RECORD_START";
const DELETE_MEDIA_RECORD_SUCCESS = "DELETE_MEDIA_RECORD_SUCCESS";
const DELETE_MEDIA_RECORD_ERROR = "DELETE_MEDIA_RECORD_ERROR";

export default new Vuex.Store({
  state: {
    mediaRecords: null,
    mediaRecord: null,
    mediaErrors: [],
    loadingMediaRecord: false,
    loadingMediaRecords: false
  },
  mutations: {
    [GET_MEDIA_RECORDS_START]: state => {
      state.loadingMediaRecords = true;
    },
    [GET_MEDIA_RECORDS_SUCCESS]: (state, payload) => {
      state.mediaRecords = payload;
      state.loadingMediaRecords = false;
    },
    [GET_MEDIA_RECORDS_ERROR]: (state, payload) => {
      state.loadingMediaRecords = false;
      state.mediaErrors = payload.errors;
    },

    [GET_MEDIA_RECORD_START]: state => {
      state.loadingMediaRecord = true;
    },
    [GET_MEDIA_RECORD_SUCCESS]: (state, payload) => {
      state.mediaRecord = payload;
      state.loadingMediaRecord = false;
    },
    [GET_MEDIA_RECORD_ERROR]: (state, payload) => {
      state.loadingMediaRecord = false;
      state.mediaErrors = payload.errors;
    },

    [RESET_GET_MEDIA_RECORD]: state => {
      state.mediaRecord = null;
    },

    [POST_MEDIA_RECORD_START]: state => {
      state.loadingMediaRecords = true;
    },
    [POST_MEDIA_RECORD_SUCCESS]: (state, payload) => {
      state.mediaRecords = [...state.mediaRecords, payload];
      state.loadingMediaRecords = false;
    },
    [POST_MEDIA_RECORD_ERROR]: (state, payload) => {
      state.loadingMediaRecords = false;
      state.mediaErrors = payload.errors;
    },

    [PUT_MEDIA_RECORD_START]: state => {
      state.loadingMediaRecords = true;
    },
    [PUT_MEDIA_RECORD_SUCCESS]: (state, payload) => {
      state.loadingMediaRecords = false;
      const updatedRecordIndex = state.mediaRecords.findIndex(
        record => record.guid === payload.guid
      );

      if (updatedRecordIndex > 0) {
        return;
      }

      state.mediaRecords[updatedRecordIndex] = payload;
    },
    [PUT_MEDIA_RECORD_ERROR]: (state, payload) => {
      state.loadingMediaRecords = false;
      state.mediaErrors = payload.errors;
    },

    [DELETE_MEDIA_RECORD_START]: state => {
      state.loadingMediaRecords = true;
    },
    [DELETE_MEDIA_RECORD_SUCCESS]: (state, guid) => {
      state.mediaRecords = state.mediaRecords.filter(
        record => record.guid !== guid
      );
      state.loadingMediaRecords = false;
    },
    [DELETE_MEDIA_RECORD_ERROR]: (state, payload) => {
      state.loadingMediaRecords = false;
      state.mediaErrors = payload.errors;
    }
  },
  actions: {
    [GET_MEDIA_RECORDS]: async ({ commit }) => {
      commit(GET_MEDIA_RECORDS_START);

      try {
        const response = await getAllMediaRecords();
        commit(
          GET_MEDIA_RECORDS_SUCCESS,
          response.data.map(transformApiEntity)
        );
      } catch (e) {
        commit(GET_MEDIA_RECORDS_ERROR, e);
      }
    },
    [GET_MEDIA_RECORD]: async ({ commit }, guid) => {
      commit(GET_MEDIA_RECORD_START);

      try {
        const response = await getMediaRecord(guid);
        commit(GET_MEDIA_RECORD_SUCCESS, transformApiEntity(response.data));
      } catch (e) {
        commit(GET_MEDIA_RECORD_ERROR, e);
      }
    },
    [RESET_GET_MEDIA_RECORD]: ({ commit }) => {
      commit(RESET_GET_MEDIA_RECORD);
    },
    [POST_MEDIA_RECORD]: async ({ commit }, payload) => {
      commit(POST_MEDIA_RECORD_START);

      try {
        const response = await createMediaRecord(payload);
        commit(POST_MEDIA_RECORD_SUCCESS, transformApiEntity(response.data));
      } catch (e) {
        commit(POST_MEDIA_RECORD_ERROR, e);
      }
    },
    [PUT_MEDIA_RECORD]: async ({ commit }, payload) => {
      commit(PUT_MEDIA_RECORD_START);

      const { guid, ...data } = payload;

      try {
        const response = await updateMediaRecord(guid, data);
        commit(PUT_MEDIA_RECORD_SUCCESS, transformApiEntity(response));
      } catch (e) {
        commit(PUT_MEDIA_RECORD_ERROR, e);
      }
    },
    [DELETE_MEDIA_RECORD]: async ({ commit }, guid) => {
      commit(DELETE_MEDIA_RECORD_START);

      try {
        await deleteMediaRecord(guid);
        commit(DELETE_MEDIA_RECORD_SUCCESS, guid);
      } catch (e) {
        commit(DELETE_MEDIA_RECORD_ERROR, e);
      }
    }
  },
  getters: {
    mediaRecord: state => state.mediaRecord,
    mediaRecords: state => state.mediaRecords,
    mediaErrors: state => state.mediaErrors,
    loadingMediaRecord: state => state.loadingMediaRecord,
    loadingMediaRecords: state => state.loadingMediaRecords
  }
});
