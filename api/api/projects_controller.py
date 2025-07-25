from django.http import HttpRequest
from ninja import Router

from .external import railway
from .schema import ProjectRes

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
