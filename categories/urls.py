from django.urls import path
from  .views import CategoryListView, CategoryRetrieveView

urlpatterns = [
    path('category/', CategoryListView.as_view()),
    path('category/<slug:slug>', CategoryRetrieveView.as_view())
]
