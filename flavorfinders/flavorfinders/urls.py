from django.contrib import admin
from django.urls import path, include

from django.contrib.auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls'), name= 'home'),
    path('users/', include('users.urls')),
    path('partner/', include('partners.urls')),
    path('dashboard/', include('dashboard.urls')),
    path('reset_password/', auth_views.PasswordResetView.as_view(template_name='reset_password.html'), name='reset_password'),
    path('reset_password_sent/', auth_views.PasswordResetDoneView.as_view(template_name='password_reset_done.html'), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset_password_complete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
]
