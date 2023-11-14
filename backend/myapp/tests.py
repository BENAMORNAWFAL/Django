from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse

class YourAPITestCase(TestCase):
    def setUp(self):
        # Set up any necessary data or test fixtures here
        self.client = APIClient()

    def test_endpoint_name(self):
        # Make a GET or POST request to your API endpoint
        url=url = reverse('create_annotation')
        response = self.client.get(url)  # Replace with your endpoint URL
        self.assertEqual(response.status_code, status.HTTP_200_OK)  # Adjust status code as needed
        # Add more assertions to check the response content and structure

