import axios from "axios";
let Base_url = "http://localhost:3088/upload";

const uploadFile = async (file, fn) => {
  const config = {
    onUploadProgress: fn,
  };
  let data = new FormData();
  data.append("image", file);
  return axios.post(Base_url, data, config);
};

export { uploadFile };
