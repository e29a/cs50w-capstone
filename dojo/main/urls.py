from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("signup", views.signup_view, name="signup"),
    path("signin", views.signin_view, name="signin"),
    path("app/dashboard", views.app_dashboard, name="dashboard"),
    path("app/cryptocurrencies", views.app_cryptocurrencies, name="signin")
]