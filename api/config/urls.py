from django.contrib import admin
from django.urls import path
from ninja import NinjaAPI
from api.projects_controller import router as projects_router
from api.services_controller import router as services_router


api = NinjaAPI()

api.add_router("", projects_router)
api.add_router("", services_router)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api.urls),
]
