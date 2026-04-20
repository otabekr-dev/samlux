from django.db import models
from django.utils.text import slugify
import uuid

class Category(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(unique=True, blank=True)
    parent = models.ForeignKey(
        'self',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='children'
    )
    icon = models.ImageField(
        upload_to='category/',
        null=True,
        blank=True
    )
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)


    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name) + '-' + str(uuid.uuid4())[:6]
        super().save(*args, **kwargs)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f'{self.id}.{self.name}'                            