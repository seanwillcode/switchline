import React from "react";
import { Modal } from "@mantine/core";
import type { ServiceRes } from "../../api/models";
import ServiceForm from "./ServiceForm";

interface ServiceModalProps {
  projectID: string;
  service?: ServiceRes;
  services: ServiceRes[];
  isOpen: boolean;
  onClose: () => void;
}
const ServiceModal: React.FC<ServiceModalProps> = ({
  projectID,
  service,
  services,
  isOpen,
  onClose,
}) => {
  const isCreate = !service;

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={isCreate ? "Create Service" : "Update Service"}
      centered
    >
      <ServiceForm
        projectID={projectID}
        existingNames={services.map((service) => service.name)}
        onClose={onClose}
      />
    </Modal>
  );
};

export default ServiceModal;
