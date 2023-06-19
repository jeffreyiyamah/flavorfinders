from django.shortcuts import render

# Create your views here.
def partnerLogin(request):
    return render(request, 'partners/partner-login.html')

def partnerRegister(request):
    return render(request, 'partners/index-merchant.html')