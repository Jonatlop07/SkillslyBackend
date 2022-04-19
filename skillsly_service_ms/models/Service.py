from django.db import models

class Service(models.Model):

    requester_id = models.IntegerField(
        "requester_id", null=False, blank=False
    )

    title = models.CharField(
        "title", null=False, blank=False, max_length=150
    )

    description = models.CharField(
        "description", null=False, blank=False, max_length=300
    )

    contact_info = models.CharField(
        "contact_info", null=False, blank=False, max_length=200
    )

    category = models.CharField(
        "category", null=False, blank=False, max_length=60
    )

    PHASE_CHOICES = [
        ("open", "Open"),
        ("closed", "Closed"),
        ("evaluation", "Evaluation"),
        ("execution", "Execution"),
        ("finished", "Finished")
    ]

    phase = models.CharField(
        "phase", null=False, blank=False, max_length=10, choices=PHASE_CHOICES, default="open"
    )

    created_at = models.DateField(
        "created_at", auto_now_add=True, null=False, blank=False
    )

    updated_at = models.DateField(
        "updated_at", auto_now=True, null=False, blank=False
    )

    provider_id = models.IntegerField(
        "provider_id", null=False, blank=False, unique=False
    )

    canceled = models.BooleanField(
        "canceled", null=False, blank=False, default=False
    )

    def __str__(self):
        return self.title

    class Meta:

        verbose_name = "Service"
        verbose_name_plural = "Services"
