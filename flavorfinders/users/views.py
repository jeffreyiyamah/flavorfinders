from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth import logout
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.core.mail import send_mail
from django.conf import settings


from .forms import SignUpForm

# Create your views here.
def registerUser(request):
    
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)

                subject = 'Welcome to Flavor Finders'
                message = f'Hi, {{username}} we are glad you can join us. Hope you enjoy our platform and stay for a while'

                try:
                    send_mail(subject,message,settings.EMAIL_HOST_USER,[user.email],fail_silently=False)
                except Exception as e:
                    print(f"Error sending email: {e}")

            return redirect('dashboard')
        
    else:
        form = SignUpForm()
    return render(request, 'users/register.html', {'form': form})
        


def loginUser(request):

    
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
           
            login(request, user)
        return redirect('dashboard')
    else:
        form = AuthenticationForm(request)
    return render(request, 'users/login.html', {'form' : form})

def logout_view(request):
    logout(request)
    return redirect('login_page')

