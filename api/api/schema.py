from ninja import Schema


class DeploymentRes(Schema):
    id: str
    status: str
    createdAt: str
    statusUpdatedAt: str
    canRedeploy: bool


class ServiceRes(Schema):
    id: str
    name: str
    createdAt: str
    deletedAt: str | None
    deployments: list[DeploymentRes]


class ProjectRes(Schema):
    id: str
    name: str
    description: str | None
    createdAt: str
    deletedAt: str | None
    services: list[ServiceRes]


class ServiceCreateReq(Schema):
    projectID: str
    name: str
    image: str
