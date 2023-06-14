from django.urls import path
from . import views

urlpatterns = [
    path('sign_up/', views.registerUser, name="register_page"),
    path('sign_in/', views.loginUser, name="login_page"),
]