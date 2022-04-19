from rest_framework import serializers
from skillsly_service_ms.models import Application, Service

class ApplicationUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application
        fields = ["message"]