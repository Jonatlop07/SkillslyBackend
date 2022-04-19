from rest_framework import serializers
from skillsly_service_ms.models import Application, Service

class ApplicationRegistSerializer(serializers.ModelSerializer):

    idService = serializers.PrimaryKeyRelatedField(
        write_only=True, queryset=Service.objects.all(), source="service_id"
    )

    class Meta:
        model = Application
        fields = ["service_id", "idService", "applicant_id", "message"]
        read_only_fields = ["service_id"]
        depth = 1