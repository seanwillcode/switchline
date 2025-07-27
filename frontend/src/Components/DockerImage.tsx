import React from "react";
import { Card, Group, Text, Badge, Button, Divider } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { DeploymentRes } from "../api/models";

dayjs.extend(relativeTime);

interface StatusBadgeProps {
  status: string;
}
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "SUCCESS":
      return <Badge color="green">Success</Badge>;
    case "PENDING":
      return <Badge color="purple">Pending</Badge>;
    case "FAILED":
      return <Badge color="red">Failed</Badge>;
    default:
      return <Badge color="blue">Unknown</Badge>;
  }
};

interface DockerImageProps {
  name: string;
  deployments: DeploymentRes[];
}
const DockerImage: React.FC<DockerImageProps> = ({ name, deployments }) => {
  console.log(name, deployments.length);

  const CTAText =
    deployments.length === 0
      ? "Deploy"
      : deployments[deployments.length - 1].canRedeploy
        ? "Redeploy"
        : "Deploy";

  const latestDeploy =
    deployments.length === 0
      ? "Never"
      : dayjs().to(dayjs(deployments[deployments.length - 1].createdAt));

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w="400" m="md">
      <Text fw={600} size="lg" mb="md">
        {name}
      </Text>
      <Divider />

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Status</Text>
        <StatusBadge
          status={
            deployments.length > 0
              ? deployments[deployments.length - 1].status
              : "PENDING"
          }
        />
      </Group>

      <Group justify="space-between" mb="xs">
        <Text fw={500}>Latest Deployment</Text>
        <Text>{latestDeploy}</Text>
      </Group>

      <Button color="blue" fullWidth mt="md" radius="md">
        {CTAText}
      </Button>
    </Card>
  );
};

export default DockerImage;
