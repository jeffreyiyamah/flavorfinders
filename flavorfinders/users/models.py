from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Profile(models.Model):
    user  = models.OneToOneField(User, on_delete =models.CASCADE,null= True, blank= True)
    email = models.EmailField(null= False, blank=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=50)
    
    def __str__(self):
        return str(self.user.username)