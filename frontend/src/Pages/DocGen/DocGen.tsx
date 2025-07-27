import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Flex, Group, Select, Text, Title } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import { documentProject, getAllProjects } from "../../api/projects";
import {
  generateSelectData,
  getProjectById,
  markdownWordWrap,
} from "../../utils";
import type { ProjectOverviewReadmeRes } from "../../api/models";

const DocGen = () => {
  // Get the project
  const { data } = useQuery({
    queryFn: getAllProjects,
    queryKey: ["projects"],
  });

  const projects = (data ?? []).filter((project) => !project.deletedAt);
  const [selectedProjectId, setSelectedProjectId] = React.useState<
    string | null
  >(null);

  const selectedProject = selectedProjectId
    ? getProjectById(projects, selectedProjectId)
    : null;

  // Document the project
  const mutation = useMutation({
    mutationFn: documentProject,
  });

  const [projectDocs, setProjectDocs] =
    React.useState<ProjectOverviewReadmeRes | null>(null);

  const handleClick = () => {
    if (!selectedProjectId) return;
    mutation.mutate(
      { projectID: selectedProjectId },
      {
        onSuccess: (data) => {
          if (!data) return;

          setProjectDocs(data);
        },
      },
    );
  };

  return (
    <>
      <Group mb="xl">
        <Flex w="100%" justify="space-between">
          <Title order={2}>Documentation Generator</Title>
          <Flex>
            <Select
              data={generateSelectData(projects)}
              placeholder="Select a project"
              value={selectedProjectId}
              onChange={setSelectedProjectId}
            />
          </Flex>
        </Flex>
        <Flex w="100%" justify="space-between">
          <Text>{selectedProject?.description || ""}</Text>
        </Flex>
      </Group>

      <Flex justify="center" align="center" h="100%">
        {!projectDocs && (
          <Button
            disabled={!selectedProjectId}
            onClick={handleClick}
            loading={mutation.isPending}
          >
            Create Documentation
          </Button>
        )}
        {projectDocs && (
          <CodeHighlight
            code={markdownWordWrap(projectDocs.content)}
            language="md"
            radius="md"
          />
        )}
      </Flex>
    </>
  );
};

export default DocGen;
