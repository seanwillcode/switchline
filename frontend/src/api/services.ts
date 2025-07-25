import { client } from "./client";

export const createService = async (body: {
  projectID: string;
  name: string;
  image: string;
}) => {
  const { data } = await client.POST("/api/services", {
    body,
  });
  return data;
};
