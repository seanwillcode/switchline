import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Button, Box } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createService } from "../../api/services";

interface ServiceFormProps {
  projectID: string;
  existingNames: string[];
  onClose: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  projectID,
  existingNames,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const createServiceMutation = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      onClose();
    },
  });

  const schema = z.object({
    image: z.string().min(1, { message: "Docker image required" }),
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .refine((val) => !existingNames.includes(val.trim().toLowerCase()), {
        message: "Name is already in use, please choose another name.",
      }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    createServiceMutation.mutate({
      projectID,
      image: data.image,
      name: data.name,
    });
  };

  return (
    <Box maw={400} mx="auto" mt="md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextInput
              label="Name"
              placeholder="Enter the service name"
              error={errors.name?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="image"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextInput
              label="Docker image"
              placeholder="Enter the docker image"
              error={errors.name?.message}
              {...field}
            />
          )}
        />

        <Button
          type="submit"
          mt="md"
          fullWidth
          loading={createServiceMutation.isPending}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ServiceForm;
