<template>
  <div>
    <div
      v-if="loadingMediaRecord"
      class="d-flex align-items-center justify-content-center"
    >
      <b-spinner class="mr-2"></b-spinner>
    </div>
    <b-form v-else novalidate @submit.prevent="submitForm">
      <b-form-group label="Title" label-for="media-title">
        <b-form-input
          id="media-title"
          v-model="form.title"
          type="text"
          placeholder="Enter title"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="Type:" label-for="media-type">
        <b-form-select
          id="media-type"
          v-model="form.type"
          :options="typeEnum"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Kind:" label-for="media-kind">
        <b-form-select
          id="media-kind"
          v-model="form.kind"
          :options="kindEnum"
        ></b-form-select>
      </b-form-group>

      <b-form-group label="Number of discs:" label-for="media-number-of-discs">
        <b-form-input
          id="media-number-of-discs"
          v-model="form.numberOfDiscs"
          placeholder="Enter number of discs"
        >
          ></b-form-input
        >
      </b-form-group>

      <b-form-group label="Release year:" label-for="release-year">
        <b-form-input
          id="release-year"
          v-model="form.releaseYear"
          placeholder="Enter release year"
        ></b-form-input>
      </b-form-group>

      <b-alert variant="danger" :show="errors.length > 0">
        <h5>Please fix following errors</h5>
        <div v-for="err in errors" :key="err">- {{ err }}</div>
      </b-alert>

      <div class="text-right">
        <b-button class="mr-2" @click="closeModal()">Cancel</b-button>
        <b-button type="submit" variant="primary">Submit</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import {
  POST_MEDIA_RECORD,
  PUT_MEDIA_RECORD,
  GET_MEDIA_RECORD,
  RESET_GET_MEDIA_RECORD
} from "../store";
import { typeEnum, kindEnum } from "../constants";

export default {
  props: {
    recordId: {
      type: String,
      default: null
    },
    closeModal: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      kindEnum,
      typeEnum,
      errors: []
    };
  },
  computed: {
    ...mapGetters(["mediaRecord", "loadingMediaRecord"]),
    form() {
      return this.mediaRecord || { type: typeEnum[0], kind: kindEnum[0] };
    }
  },
  created() {
    if (this.recordId) {
      this.getRecord(this.recordId, this);
    }
  },
  beforeDestroy() {
    if (this.recordId) {
      this.resetRecord();
    }
  },
  methods: {
    ...mapActions({
      getRecord: GET_MEDIA_RECORD,
      resetRecord: RESET_GET_MEDIA_RECORD,
      createRecord: POST_MEDIA_RECORD,
      updateRecord: PUT_MEDIA_RECORD
    }),
    async submitForm() {
      this.errors = [];

      if (
        this.form.numberOfDiscs !== undefined &&
        isNaN(this.form.numberOfDiscs)
      ) {
        this.errors.push("Number of discs must be a number");
      }

      if (this.form.releaseYear !== undefined && isNaN(this.form.releaseYear)) {
        this.errors.push("Release year must be a number");
      }

      console.log(Number.isNaN(this.form.numberOfDiscs));
      console.log(this.errors, this.form.numberOfDiscs);

      if (this.errors.length) {
        return;
      }

      const submitFn = this.recordId ? this.updateRecord : this.createRecord;
      const payload = { ...this.form };

      if (this.recordId) {
        payload.giud = this.recordId;
      }

      await submitFn(payload);
      this.closeModal();
    }
  }
};
</script>
