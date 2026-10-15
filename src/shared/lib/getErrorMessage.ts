import axios from "axios";

export default function getErrorMessage(error: Error): string {
  return axios.isAxiosError<{ error: string }>(error) && error.response
    ? error.response.data.error
    : error.message;
}
