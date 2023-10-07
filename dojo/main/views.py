from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from datetime import datetime, timedelta
from .models import * 
from decimal import Decimal


# Create your views here.
def index(request):
    return render(request, "main/site/index.html")

@csrf_exempt 
def signin_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('app/dashboard')
        else:
            return redirect('/signin')
    return render(request, 'main/site/signin.html')

def logout_view(request):
    logout(request)
    return redirect('/signin')
    
@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = CustomUser.objects.create_user(username=username, password=password, profile="", rank="7th Kyu")
        newportfolio = UserPortfolio.objects.create(user=username, cryptocurrency='tether', quantity=100000)
        newportfolio.save()
        login(request, user)
        return redirect('app/dashboard')
    return render(request, 'main/site/signup.html')


@login_required
def app_dashboard(request):
    return render(request, "main/app/dashboard.html")

def app_cryptocurrencies(request):
    if request.method == "GET":
        return render(request, "main/app/cryptocurrencies.html")



def get_user_portfolio(request):
    user = request.user
    portfolio = UserPortfolio.objects.filter(user=user.username)
    
    # Check if the portfolio is empty
    if not portfolio:
        return JsonResponse({"message": "Not found"}, status=404)
    
    # Serialize each UserPortfolio object in the queryset
    serialized_portfolio = [item.serialize() for item in portfolio]
    
    return JsonResponse(serialized_portfolio, safe=False)

# Sell cryptocurrency
def sell_crypto(request, crypto, amount, value):
    user = request.user
    portfolio = UserPortfolio.objects.filter(user=user.username)

    currency_exists = False
    currency_row = ""

    for item in portfolio:
        if item.cryptocurrency == crypto:
            currency_exists = True
            currency_row = item
            break
        else:
            pass
    
    if currency_exists:
        if currency_row.quantity == Decimal(amount):
            currency_row.delete()
            return JsonResponse({"message": "You have successfully sold " + amount + " " + crypto + " for " + value + " USDT"}, status=201)

        elif currency_row.quantity > Decimal(amount):
            currency_row.quantity = currency_row.quantity - Decimal(amount)
            currency_row.save()

            usd_row = UserPortfolio.objects.get(user=user.username, cryptocurrency="tether")
            usd_row.quantity = usd_row.quantity + Decimal(value)
            usd_row.save()

            return JsonResponse({"message": "You have successfully sold " + amount + " " + crypto + " for " + value + " USDT"}, status=201)
        else:
            return JsonResponse({"message": "You do not have enough funds to complete the trade"}, status="500")
    else:
        return JsonResponse({"message": "You do not have enough funds to complete the trade"}, status="500")

# Buy cryptocurrency
def buy_crypto(request, crypto, amount, value):
    user = request.user
    portfolio = UserPortfolio.objects.filter(user=user.username)
    usd_row = UserPortfolio.objects.get(user=user.username, cryptocurrency="tether")

    currency_exists = False
    currency_row = ""

    for item in portfolio:
        if item.cryptocurrency == crypto:
            currency_exists = True
            currency_row = item
            break
        else:
            pass
    
    if usd_row.quantity >= Decimal(value):
        usd_row.quantity -= Decimal(value)
        usd_row.save()
        if currency_exists:
            currency_row.quantity += Decimal(amount)
        else:
            new_currency_row = UserPortfolio(user=user.username, cryptocurrency=crypto, quantity=amount)
            new_currency_row.save()
        return JsonResponse({"message": "You have successfully bought " + amount + " " + crypto + " for " + value + " USDT"}, status=201)
    else:
        return JsonResponse({"message": "You do not have enough funds to complete the trade"}, status="500")


 
