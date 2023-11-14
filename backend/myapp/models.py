from django.db import models

class Document(models.Model):
    text = models.TextField()
    
class Annotation(models.Model):

    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    label = models.CharField(max_length=20)
    start = models.IntegerField()
    end = models.IntegerField()
    text_selected = models.CharField(max_length=1000)