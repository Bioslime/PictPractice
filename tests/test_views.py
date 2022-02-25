from django.test import TestCase
from rest_framework.test import APIClient
from django.core.files.uploadedfile import SimpleUploadedFile

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


class PictureTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/picture/'
        
        self.client.post('/api/user/', data={'username': 'defalut', 'password': 'defalutpass1', 'password2': 'defalutpass1', 'email': 'defalut@test.com'}, formt='json')

        res = self.client.get('/api/user/', data={'username': 'defalut', 'password': 'defalutpass1'}, format='json')
        self.token = 'Bearer ' + res.data[0]['token']
        self.user_uid = res.data[0]['id']

    def test_get_not_login(self):
        res = self.client.get(self.url, format='json')
        self.assertEqual(res.status_code, 401)

    def test_get_login(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res = self.client.get(self.url, format='json')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 0)

    def test_post_login(self):
        picture_adress = r'.\media\test_image\test.png'
        with open(picture_adress, 'rb') as f:
            img = f.read()
        data = {'user_uid': self.user_uid, 'picture': SimpleUploadedFile('test.png', img, content_type='image/png'), 'title': 'test'}

        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res1 = self.client.post(self.url, data=data, format='multipart')
        res2 = self.client.get(self.url)

        self.assertEqual(res1.status_code, 201)
        self.assertEqual(len(res2.data), 1)

    def test_post_not_login(self):
        picture_adress = r'.\media\test_image\test.png'
        with open(picture_adress, 'rb') as f:
            img = f.read()
        data = {'user_uid': self.user_uid, 'picture': SimpleUploadedFile('test.png', img, content_type='image/png'), 'title': 'test'}

        res1 = self.client.post(self.url, data=data, format='multipart')
        
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res2 = self.client.get(self.url)

        self.assertEqual(res1.status_code, 401)
        self.assertEqual(len(res2.data), 0)

    def test_no_image(self):
        data = {'user_uid': self.user_uid, 'title': 'test'}

        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res = self.client.post(self.url, data=data, format='multipart')

        self.assertEqual(res.status_code, 400)

    def test_no_title(self):
        picture_adress = r'.\media\test_image\test.png'
        with open(picture_adress, 'rb') as f:
            img = f.read()
        data = {'user_uid': self.user_uid, 'picture': SimpleUploadedFile('test.png', img, content_type='image/png')}

        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res = self.client.post(self.url, data=data, format='multipart')

        self.assertEqual(res.status_code, 400)

    def test_no_user_uid(self):
        picture_adress = r'.\media\test_image\test.png'
        with open(picture_adress, 'rb') as f:
            img = f.read()
        data = {'picture': SimpleUploadedFile('test.png', img, content_type='image/png'), 'title': 'test'}

        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res = self.client.post(self.url, data=data, format='multipart')

        self.assertEqual(res.status_code, 400)