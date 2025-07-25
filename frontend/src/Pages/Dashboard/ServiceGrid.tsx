import { Container, Flex, Stack } from "@mantine/core";
import DockerImage from "../../Components/DockerImage";
import type { ServiceRes } from "../../api/models";
import type React from "react";

interface ServiceGridProps {
  services: ServiceRes[];
}
const ServiceGrid: React.FC<ServiceGridProps> = ({ services }) => {
  const midpoint = Math.ceil(services.length / 2);
  const activeServices = services.filter((service) => !service.deletedAt);
  const leftColumn = activeServices.slice(0, midpoint);
  const rightColumn = activeServices.slice(midpoint);

  return (
    <Container>
      <Flex justify="space-between">
        <Stack>
          {leftColumn.map((service, index) => (
            <DockerImage
              key={index + midpoint}
              name={service.name}
              deployments={service.deployments}
            />
          ))}
        </Stack>
        <Stack>
          {rightColumn.map((service, index) => (
            <DockerImage
              key={index + midpoint}
              name={service.name}
              deployments={service.deployments}
            />
          ))}
        </Stack>
      </Flex>
    </Container>
  );
};

export default ServiceGrid;
