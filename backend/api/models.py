from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) #automatically populate when we make a new instance of a note
    author = models.ForeignKey(User, on_delete = models.CASCADE, related_name="notes") #on_delete means that if we were to delete the user, we should also delete all of the notes of the user. the related_name is how we relate the user to all of their notes

    def __str__(self):
        return self.title
