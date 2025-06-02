from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class NoteListCreate(generics.ListCreateAPIView): # we use list since we will both list all of the notes for a user and allow the ability to make new ones
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] #can only call this route if we have signed-in and have a validated JWT token

    def get_queryset(self):
        user = self.request.user # allows us to get the user object
        return Note.objects.filter(author=user) # this filters our so that we only return notes made by the user who is signed in 

    def perform_create(self, serializer): # for creating a note
        if serializer.is_valid(): # if the serializer passes the checks...
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user # allows us to get the user object
        return Note.objects.filter(author=user) # this filters our so that we only return notes made by the user who is signed in 