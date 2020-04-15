<template>
  <div>
    <b-row class="my-2 mx-0">
      <b-col cols="12" sm="6" md="5" lg="4">
        <b-input-group>
          <b-form-input
            v-model="filterQuery"
            placeholder="Filter..."
          ></b-form-input>
          <b-input-group-append is-text>
            <b-icon-search />
          </b-input-group-append>
        </b-input-group>
      </b-col>
      <b-col cols="12" sm="6" md="7" lg="8" class="text-right">
        <b-button variant="primary" @click="openModal()">
          <span class="d-flex align-items-center">
            Create new <b-icon-plus />
          </span>
        </b-button>
      </b-col>
    </b-row>

    <b-table
      striped
      hover
      responsive
      sort-icon-left
      :filter="filterQuery"
      :busy="loadingMediaRecords"
      :items="mediaRecords"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      class="media-table"
    >
      <template v-slot:cell(actions)="{ item }">
        <b-button class="mx-1" @click="openModal(item.guid)">
          <b-icon-pencil />
        </b-button>
        <b-button
          class="mx-1"
          variant="danger"
          @click="deleteRecord(item.guid)"
        >
          <b-icon-trash />
        </b-button>
      </template>

      <template v-slot:table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle mx-2"></b-spinner>
        </div>
      </template>
    </b-table>

    <b-modal
      v-model="modalOpened"
      :title="modalTitle"
      hide-footer
      @hidden="resetSelectedRecord()"
    >
      <media-form
        :record-id="selectedRecord"
        :close-modal="closeModal"
      ></media-form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import MediaForm from "./MediaForm";
import {
  GET_MEDIA_RECORDS,
  GET_MEDIA_RECORD,
  POST_MEDIA_RECORD,
  PUT_MEDIA_RECORD,
  DELETE_MEDIA_RECORD
} from "../store";

export default {
  components: {
    MediaForm
  },
  data() {
    return {
      filterQuery: "",
      sortBy: "title",
      sortDesc: false,
      selectedRecord: null,
      modalOpened: false,
      fields: [
        {
          key: "title",
          sortable: true
        },
        {
          key: "type",
          sortable: true
        },
        {
          key: "kind",
          sortable: true
        },
        {
          key: "releaseYear",
          sortable: true
        },
        {
          key: "numberOfDiscs",
          sortable: true
        },
        {
          key: "Actions",
          sortable: false
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      "mediaRecord",
      "mediaRecords",
      "loadingMediaRecords",
      "mediaErrors"
    ]),
    modalTitle() {
      return this.selectedRecord ? "Edit record" : "Create new record";
    }
  },
  watch: {
    mediaErrors: function(e) {
      if (e.length) {
        e.forEach(err => {
          this.$bvToast.toast(err.message, {
            title: "Error",
            variant: "danger",
            solid: true,
            toaster: "b-toaster-bottom-left"
          });
        });
      }
    }
  },
  created() {
    this.getRecords(this);
  },
  methods: {
    ...mapActions({
      getRecords: GET_MEDIA_RECORDS,
      getRecord: GET_MEDIA_RECORD,
      createRecord: POST_MEDIA_RECORD,
      updateRecord: PUT_MEDIA_RECORD,
      deleteRecord: DELETE_MEDIA_RECORD
    }),
    openModal(guid) {
      if (guid) {
        this.selectedRecord = guid;
      }

      this.modalOpened = true;
    },
    closeModal() {
      this.modalOpened = false;
    },
    resetSelectedRecord() {
      this.selectedRecord = null;
    }
  }
};
</script>

<style lang="scss">
.media-table {
  text-align: left;

  th {
    text-align: center;
    white-space: nowrap;
  }

  td:last-of-type {
    text-align: right;
  }
}
</style>
