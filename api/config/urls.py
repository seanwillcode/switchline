from django.contrib import admin
from django.urls import path
from ninja import NinjaAPI
from api.health_check import health_check
from api.projects_controller import router as projects_router
from api.services_controller import router as services_router


api = NinjaAPI()

api.add_router("", projects_router)
api.add_router("", services_router)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("healthcheck/", health_check, name="health_check"),
    path("api/", api.urls),
]
