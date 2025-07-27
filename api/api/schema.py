from datetime import datetime

from ninja import Schema


class DeploymentRes(Schema):
    id: str
    status: str
    createdAt: datetime
    statusUpdatedAt: datetime
    canRedeploy: bool


class ServiceRes(Schema):
    id: str
    name: str
    createdAt: datetime
    deletedAt: datetime | None
    deployments: list[DeploymentRes]


class ProjectRes(Schema):
    id: str
    name: str
    description: str | None
    createdAt: datetime
    deletedAt: datetime | None
    services: list[ServiceRes]


class ProjectOverviewReadmeRes(Schema):
    id: int
    created_at: datetime
    project_id: str
    content: str
    prompt: str


class ServiceCreateReq(Schema):
    projectID: str
    name: str
    image: str
