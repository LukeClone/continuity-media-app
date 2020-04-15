import { getAll, getOne, unusedGuid } from "../constants/mockedResponse";

const apiCall = (url, params, response) => {
  console.log("Request URL: ", url);
  console.log("Request params: ", params);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        console.error("RNG decide to throw error!");
        reject({
          data: null,
          errors: [
            {
              message: "Media record was not found.",
              details: "03207fe2-8ff7-47ae-b902-73a2b5589899",
              code: "media-not-found"
            }
          ]
        });
      }

      resolve({ data: response, errors: null });
    }, 1.5 * 1000);
  });
};

export const getAllMediaRecords = async () =>
  apiCall("/media", { method: "GET" }, getAll);

export const getMediaRecord = async id =>
  apiCall(`/media/${id}`, { method: "GET" }, getOne);

export const createMediaRecord = async data =>
  apiCall(
    "/media",
    {
      method: "POST",
      data
    },
    { guid: unusedGuid, ...data }
  );

export const updateMediaRecord = async (id, data) =>
  apiCall(
    `/media/${id}`,
    {
      method: "PUT",
      data: JSON.stringify(data)
    },
    { ...getOne, ...data }
  );

export const deleteMediaRecord = async id =>
  apiCall(
    `/media/${id}`,
    {
      method: "DELETE"
    },
    {}
  );
