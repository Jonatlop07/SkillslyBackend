"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from skillsly_service_ms.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('createservice/', ServiceRegistView.as_view()),
    path('listservices/', ServiceListView.as_view()),
    path('createapplication/', ApplicationRegistView.as_view()),
    path('serviceapplications/', ServiceApplicationsListView.as_view()),
    path('service/RUD/<int:pk>', ServiceRUDView.as_view()),
    path('serviceupdatephase/<int:pk>', ServicePhaseUpdateView.as_view()),
    path('serviceupdateprovider/<int:pk>', ServiceProviderUpdateView.as_view()),
    path('serviceupdatestatus/<int:pk>', ServiceStatusUpdateView.as_view()),
    path('application/RUD/<int:pk>', ApplicationRUDView.as_view())
]
