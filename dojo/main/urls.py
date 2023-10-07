from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("signup", views.signup_view, name="signup"),
    path("signin", views.signin_view, name="signin"),
    path("logout", views.logout_view, name="logout"),
    
    path("app/dashboard", views.app_dashboard, name="dashboard"),
    path("app/cryptocurrencies", views.app_cryptocurrencies, name="signin"),

    path("api/get_user_portfolio", views.get_user_portfolio, name="get_user_portfolio"),
    path("api/sell_crypto/<crypto>/<amount>/<value>", views.sell_crypto, name="sell_crypto"),
    path("api/buy_crypto/<crypto>/<amount>/<value>", views.buy_crypto, name="buy_crypto")
]