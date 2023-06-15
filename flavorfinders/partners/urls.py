from django.urls import path
from . import views

urlpatterns = [
    path('psign_up', views.partnerRegister, name="partner_register"),
    path('psign_in', views.partnerLogin, name="partner_login"),
]