import json

from django.db import transaction
from django.http import HttpRequest
from ninja import Router

from .external import railway, openai
from .models import ProjectOverviewReadme
from .schema import ProjectRes, ProjectOverviewReadmeRes

router = Router()


@router.get(
    "/projects",
    response={
        200: list[ProjectRes],
    },
)
def list_projects(request: HttpRequest):
    team_id = railway.get_team_id()
    projects = railway.get_all_projects(team_id)
    return 200, projects


@router.post(
    "/projects/{str:projectID}",
    response={
        200: ProjectOverviewReadmeRes,
    },
)
def document_project(request: HttpRequest, projectID: str):
    result = railway.get_project(projectID)

    existing_instance = ProjectOverviewReadme.objects.filter(
        project_id=projectID
    ).first()
    if existing_instance:
        return existing_instance

    prompt, content = openai.generate_documentation(json.dumps(result))

    with transaction.atomic():
        instance = ProjectOverviewReadme.objects.create(
            project_id=projectID,
            content=content,
            prompt=prompt,
        )

    return instance
