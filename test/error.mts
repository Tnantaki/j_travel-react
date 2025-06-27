import axios, { AxiosError } from "axios";

function handleError(error: any) {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      // Server responded with error status
      // console.log("Error response status:", axiosError.response.status);
      // console.log("Error response data:", axiosError.response.data);

      const contentType = axiosError.response.headers["content-type"];
      if (typeof axiosError.response.data === 'string') {
        return {
          error: axiosError.response.data,
          status: axiosError.response.status,
        };
      }

      // if (contentType && contentType.includes("text/html")) {
      //   const htmlResponse = axiosError.response.data as string;

      //   if (
      //     htmlResponse.includes("Cannot POST") ||
      //     htmlResponse.includes("Cannot GET")
      //   ) {
      //     return {
      //       error: `Route not found: The endpoint ${endpoint} doesn't exist or doesn't accept POST requests`,
      //       status: axiosError.response.status,
      //     };
      //   }

      //   if (axiosError.response.status === 404) {
      //     return {
      //       error: `404 Not Found: The API endpoint ${endpoint} was not found`,
      //       status: 404,
      //     };
      //   }

      //   return {
      //     error: `Server returned HTML instead of JSON (Status: ${axiosError.response.status})`,
      //     status: axiosError.response.status,
      //     // details: htmlResponse.substring(0, 200),
      //   };
      // }

      // return {
      //   error:
      //     axiosError.response.data ||
      //     `HTTP Error: ${axiosError.response.status}`,
      //   status: axiosError.response.status,
      // };
    } else if (axiosError.request) {
      // Request was made but no response received
      return {
        error:
          "No response from server. Check if the server is running on http://localhost:3000",
      };
    } else {
      // Something else happened
      return {
        error: `Request setup error: ${axiosError.message}`,
      };
    }
  }

  // Non-Axios error
  return {
    success: false,
    error: error instanceof Error ? error.message : "Unknown error occurred",
  };
}

export { handleError };
