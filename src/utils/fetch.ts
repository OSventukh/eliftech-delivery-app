export const getData = async (
  url: string,
  { cache }: { cache?: RequestCache } = {}
) => {
  const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + url, {
    cache,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || 'Something went wrong');
  }

  return result;
};

type SendMethod = 'POST' | 'PATCH';

export const sendData = async (
  url: string,
  data: any,
  { method }: { method?: SendMethod } = {}
) => {
  const response = await fetch(process.env.NEXT_PUBLIC_SITE_URL + url, {
    method: method || 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || 'Something went wrong');
  }
  return result;
};
