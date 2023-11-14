from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myapp import views

router = DefaultRouter()
router.register(r'document', views.DocumentViewSet)
router.register(r'annotation', views.AnnotationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('annotations/', views.annotation_list, name='annotation-list'),
    path('document/<int:document_id>/', views.get_document_by_id, name='get-document-by-id'),
]
