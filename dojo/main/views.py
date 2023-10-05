from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, "main/site/index.html")

def signin_view(request):
    if request.method == "GET":
        return render(request, "main/site/signin.html")

def signup_view(request):
    if request.method == "GET":
        return render(request, "main/site/signup.html")
    else:
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "mail/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(email, email, password)
            user.save()
        except IntegrityError as e:
            print(e)
            return render(request, "mail/register.html", {
                "message": "Email address already taken."
            })
        login(request, user)


def app_dashboard(request):
    if request.method == "GET":
        return render(request, "main/app/dashboard.html")

def app_cryptocurrencies(request):
    if request.method == "GET":
        return render(request, "main/app/cryptocurrencies.html")
