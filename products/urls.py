from django.urls import path
from .views import ProductListView, ProductRetrieveView

urlpatterns = [
    path('products/', ProductListView.as_view()),
    path('products/<slug:slug>', ProductRetrieveView.as_view())
]
