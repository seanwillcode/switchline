import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../../api/projects";
import { Button, Flex, Group, Select, Text, Title } from "@mantine/core";
import type { ProjectRes, ServiceRes } from "../../api/models";
import ServiceGrid from "./ServiceGrid";
import { useDisclosure } from "@mantine/hooks";
import ServiceModal from "./ServiceModal";

const Dashboard = () => {
  const { data } = useQuery({
    queryFn: getAllProjects,
    queryKey: ["projects"],
  });

  const projects = (data ?? []).filter((project) => !project.deletedAt);

  const [isOpen, { open: onOpen, close: onClose }] = useDisclosure();
  const [selectedProjectId, setSelectedProjectId] = React.useState<
    string | null
  >(null);

  const selectedProject = selectedProjectId
    ? getProjectById(projects, selectedProjectId)
    : null;

  return (
    <>
      <Group mb="xl">
        <Flex w="100%" justify="space-between">
          <Title order={2}>
            Projects{selectedProject && ` - ${selectedProject.name}`}
          </Title>
          <Flex>
            {!!projects.length && (
              <Select
                data={generateSelectData(projects)}
                placeholder="Select a project"
                value={selectedProjectId}
                onChange={setSelectedProjectId}
              />
            )}
            <Button ml="lg" disabled={!selectedProject} onClick={onOpen}>
              Deploy Service
            </Button>
          </Flex>
        </Flex>
        <Flex w="100%" justify="space-between">
          <Text>{selectedProject?.description || ""}</Text>
        </Flex>
      </Group>

      {selectedProject && selectedProject.services && (
        <ServiceGrid services={selectedProject.services as ServiceRes[]} />
      )}

      <ServiceModal
        projectID={selectedProjectId || ""}
        isOpen={isOpen}
        onClose={onClose}
        services={selectedProject?.services || []}
      />
    </>
  );
};

const generateSelectData = (projects: ProjectRes[]) => {
  return projects.map((project) => ({
    label: project.name,
    value: project.id,
  }));
};

const getProjectById = (
  projects: ProjectRes[],
  projectId: string | null,
): ProjectRes | null => {
  if (!projects || !projectId) return null;

  const filtered = projects.filter((project) => project.id === projectId);

  if (filtered.length === 0) return null;
  return filtered[0];
};

export default Dashboard;
