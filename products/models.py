from django.db import models
from categories.models import Category
from django.utils.text import slugify

class Product(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        related_name='products'
    )

    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True, null=True)

    short_description = models.CharField(max_length=255)
    description = models.TextField()

    price = models.DecimalField(max_digits=10, decimal_places=2)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug or self.slug.strip() == "":
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)  

class ProductImage(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='images'
    )

    image = models.ImageField(
        upload_to='product/', null=True, blank=True, default='product/product.png'
    )

    is_main = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.id}.{self.product.name} image"    