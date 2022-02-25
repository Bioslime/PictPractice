from http import client
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient


class UserTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/user/'
        self.client.post(self.url, data={'username': 'defalut', 'password': 'defalutpass1', 'password2': 'defalutpass1', 'email': 'defalut@test.com'}, formt='json')

    def test_user_post(self):
        username = 'test'
        password = 'testpass001'
        res = self.client.post(self.url, data={'username': username, 'password': password, 'password2': password}, formt='json')
        self.assertEqual(res.data['username'], username)

    def test_user_get(self):
        res = self.client.get(self.url, format='json')
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['username'], 'defalut')
    
    def test_user_login_success(self):
        res = self.client.login(username='defalut', password='defalutpass1')
        self.assertTrue(res)

    def test_user_login_failed(self):
        res = self.client.login(username='dummy', password='dummypass1')
        self.assertFalse(res)
