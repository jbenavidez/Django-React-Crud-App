from django.urls import path

from . import views 
from django.views.decorators.csrf import csrf_exempt
urlpatterns = [
  path('', csrf_exempt(views.NoteList.as_view())),
  path('<int:pk>/', views.NoteDetail.as_view()) #api/v1/notes/1
]