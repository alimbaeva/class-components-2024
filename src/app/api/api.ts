import { DataBodyI, RequestI } from '../types/interface';

const APIPATH = 'https://stapi.co/api/v1/rest/';

const defaultHeaders = (headers: object) => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    ...headers,
  };
};

async function fetchPost(
  body: DataBodyI,
  endpoint: string,
  headers: object = {},
) {
  const response = await fetch(`${APIPATH}${endpoint}`, {
    method: 'POST',
    headers: defaultHeaders(headers),
    body: new URLSearchParams(body as never),
  });

  return response.json();
}

export const api = {
  async search(request: RequestI) {
    const response = await fetchPost(request.body, request.endPoint);
    return response;
  },
};
