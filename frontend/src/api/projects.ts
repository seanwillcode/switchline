import { client } from "./client";

export const getAllProjects = async () => {
  const { data } = await client.GET("/api/projects");
  return data;
};
