from django.db import models
from django.utils import timezone


class ProjectOverviewReadme(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    project_id = models.CharField(max_length=64)
    content = models.TextField()
    prompt = models.TextField()
