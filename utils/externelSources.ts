export function getImage(uuid: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}/assets/${uuid}`;
}

export function getUserInfo(uuid: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}/users/${uuid}`;
}

export const fetcher = (...args) => fetch(...args).then((res) => res.json());
