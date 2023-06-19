from django.urls import path
from . import views
from django.contrib.auth.views import LogoutView
from django.contrib.auth import views as auth_views
from .views import logout_view



urlpatterns = [
    path('sign_up/', views.registerUser, name="register_page"),
    path('sign_in/', views.loginUser, name="login_page"),
    path('logout/', logout_view, name='logout'),

]