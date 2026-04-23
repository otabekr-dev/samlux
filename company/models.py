from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()

    logo = models.ImageField(upload_to='logos/', null=True, blank=True, default='logos/shop.jpg')

    phone = models.CharField(max_length=50)
    email = models.EmailField()
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.name

