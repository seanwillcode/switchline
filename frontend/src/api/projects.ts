import { client } from "./client";

export const getAllProjects = async () => {
  const { data } = await client.GET("/api/projects");
  return data;
};

export const documentProject = async (body: { projectID: string }) => {
  const { data } = await client.POST("/api/projects/{projectID}", {
    params: {
      path: {
        projectID: body.projectID,
      },
    },
  });
  return data;
};
