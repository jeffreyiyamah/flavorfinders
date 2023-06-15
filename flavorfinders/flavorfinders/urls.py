from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls')),
    path('users/', include('users.urls')),
    path('partner/', include('partners.urls')),
    path('dashboard/', include('dashboard.urls')),
]
