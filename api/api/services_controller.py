from django.http import HttpRequest
from ninja import Router

from .external import railway
from .schema import ServiceCreateReq

router = Router()


@router.post(
    "/services",
    response={201: None},
)
def create_service(request: HttpRequest, payload: ServiceCreateReq):
    railway.create_container(payload.name, payload.projectID, payload.image)
    return 201, None
