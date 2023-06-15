from django.shortcuts import render

# Create your views here.
def registerUser(request):
    return render(request, 'users/register.html')

def loginUser(request):
    return render(request, 'users/login.html')