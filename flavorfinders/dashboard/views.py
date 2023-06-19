from django.shortcuts import render

# Create your views here.
def dashboard(request):
    username = request.user.username
    return render(request, 'dashboard/main.html', {'username': username})

