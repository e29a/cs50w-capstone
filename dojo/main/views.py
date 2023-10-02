from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "main/app/dashboard.html")

def signin_view(request):
    if request.method == "GET":
        return render(request, "main/site/signin.html")

def signup_view(request):
    if request.method == "GET":
        return render(request, "main/site/signup.html")
