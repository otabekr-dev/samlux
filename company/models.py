from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    class Role(models.TextChoices):
        COMPANY = 'COMPANY', 'Company'
        CUSTOMER = 'CUSTOMER', 'Customer'

    role = models.CharField(max_length=10, choices=Role.choices, default=Role.CUSTOMER)


class Company(models.Model):
    name = models.CharField(max_length=200)
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    logo = models.ImageField(
        upload_to='logos/',
        null=True,
        blank=True,
        default='media/logos/shop.jpg'
    )
    about = models.TextField(null=True, blank=True)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=256)
    

