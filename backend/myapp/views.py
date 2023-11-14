from rest_framework import viewsets
from .models import Document, Annotation
from .serializers import DocumentSerializer, AnnotationSerializer
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from rest_framework.decorators import api_view


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    
    def perform_create(self, serializer):
        instance = serializer.save()
        new_document_id = instance.id  # Get the ID of the newly created document
        print("==========",new_document_id)
        return Response({'id': new_document_id}, status=status.HTTP_201_CREATED)

class AnnotationViewSet(viewsets.ModelViewSet):
    
    queryset = Annotation.objects.all()
    serializer_class = AnnotationSerializer

@api_view(['GET'])
def annotation_list(request):
    annotations = Annotation.objects.all()
    serializer = AnnotationSerializer(annotations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_document_by_id(request, document_id):
    try:
        document = Document.objects.get(id=document_id)
        data = {
            'text': document.text,
            'id': document.id
        }
        return JsonResponse(data)
    except Document.DoesNotExist:
        return JsonResponse({'error': 'Document not found'}, status=404)