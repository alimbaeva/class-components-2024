import { ResData } from '../types/interface';

const APIPATH = 'https://swapi.dev/api/';

const defaultHeaders = (headers: object) => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  };
};

async function fetchGet(
  endpoint: string,
  params: object = {},
  headers: object = {},
) {
  const url = new URL(`${APIPATH}${endpoint}`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString()),
  );

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: defaultHeaders(headers),
  });

  return response.json();
}

async function getAllPages(endpoint: string) {
  let results: ResData[] = [];
  let nextPage: string | null = endpoint;

  while (nextPage) {
    const response = await fetchGet(nextPage.replace(APIPATH, ''));
    results = results.concat(response.results);
    nextPage = response.next;
  }

  return results;
}

async function fetchByIdOrUrl(urlOrId: string) {
  const endpoint = urlOrId.startsWith('http')
    ? urlOrId.replace(APIPATH, '')
    : `${urlOrId}/`;
  const response = await fetchGet(endpoint);
  return response;
}

export const api = {
  async getPeoples(page: number = 1) {
    const response = await fetchGet('people/', { page });
    return response;
  },

  async getPeopleIdOrUrl(urlOrId: string) {
    const response = await fetchByIdOrUrl(urlOrId);
    return response;
  },

  async findPeopleByName(name: string) {
    const people = await getAllPages('people/');
    const person = people.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase()),
    );
    return person;
  },
};
