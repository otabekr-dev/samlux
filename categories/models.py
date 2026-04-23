from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True, null=True, blank=True)
    image = models.ImageField(
        null=True, blank=True, upload_to='category/', default='category/default_category.jpg'
    )

    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='children'
    )

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug or self.slug.strip() == "":
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)    