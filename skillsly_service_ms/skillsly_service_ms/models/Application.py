from django.db import models
from .Service import Service

class Application(models.Model):

    service_id = models.ForeignKey(
        Service, on_delete=models.CASCADE, null=False, blank=False
    )

    applicant_id = models.IntegerField(
        "applicant_id", null=False, blank=False
    )

    message = models.CharField(
        "message", null=True, blank=True, max_length=300
    )

    created_at = models.DateField(
        "created_at", auto_now_add=True, null=False, blank=False
    )

    updated_at = models.DateField(
        "updated_at", auto_now=True, null=False, blank=False
    )

    def __str__(self):
        return self.applicant_id

    class Meta:

        verbose_name = "Application"
        verbose_name_plural = "Applications"