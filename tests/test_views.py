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

    def test_post_no_username(self):
        password = 'testpass001'
        res = self.client.post(self.url, data={'password': password, 'password2': password}, formt='json')
        self.assertEqual(res.status_code, 400)

    def test_post_no_password(self):
        username = 'test'
        res = self.client.post(self.url, data={'username': username}, formt='json')
        self.assertEqual(res.status_code, 400)


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

    def test_with_otherPicture(self):
        picture_adress = r'.\media\test_image\test.png'
        with open(picture_adress, 'rb') as f:
            img = f.read()
        data1 = {'user_uid': self.user_uid, 'picture': SimpleUploadedFile('test1.png', img, content_type='image/png'), 'title': 'test1'}
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res1 = self.client.post(self.url, data=data1, format='multipart')
        url = self.url + res1.data['id'] + '/'
        other_uid = self.client.get(url).data['id']

        data2 = {'user_uid': self.user_uid, 'picture': SimpleUploadedFile('test2.png', img, content_type='image/png'), 'title': 'test2', 'other_uid':other_uid}
        res2 = self.client.post(self.url+'compare/', data=data2, format='multipart')
        url = self.url + res2.data['id'] + '/'
        res3 = self.client.get(url)

        self.assertEqual(res1.status_code, 201)
        self.assertEqual(str(res3.data['anotherPict']), other_uid)


class RandomModelTestCase(TestCase):
    def setUp(self):
        self.url = '/api/questions/'
        self.client = APIClient()

        self.client.post('/api/user/', data={'username': 'defalut', 'password': 'defalutpass1', 'password2': 'defalutpass1', 'email': 'defalut@test.com'}, formt='json')
        res = self.client.get('/api/user/', data={'username': 'defalut', 'password': 'defalutpass1'}, format='json')
        self.token = 'Bearer ' + res.data[0]['token']

    def test_question_get_zero_check(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 0)

    def test_post_no_token(self):
        text = 'test_question'
        data = {'question': text}
        res = self.client.post(self.url, data=data)
        self.assertEqual(res.status_code, 401)

    def test_post_with_token(self):
        text = 'test_question'
        data = {'question': text}
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res = self.client.post(self.url, data=data)
        self.assertEqual(res.status_code, 201)

        res = self.client.get(self.url)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['question'], text)

    def test_post_no_question(self):
        data = {}
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res = self.client.post(self.url, data=data)
        self.assertEqual(res.status_code, 400)


class CommentTestCase(TestCase):
    def setUp(self):
        self.url = '/api/comment/'
        self.client = APIClient()

        self.client.post('/api/user/', data={'username': 'defalut', 'password': 'defalutpass1', 'password2': 'defalutpass1', 'email': 'defalut@test.com'}, formt='json')
        res = self.client.get('/api/user/', data={'username': 'defalut', 'password': 'defalutpass1'}, format='json')
        self.token = 'Bearer ' + res.data[0]['token']
        self.user_uid = res.data[0]['id']

        picture_url = '/api/picture/'
        picture_adress = r'.\media\test_image\test.png'
        with open(picture_adress, 'rb') as f:
            img = f.read()
        data = {'user_uid': self.user_uid, 'picture': SimpleUploadedFile('test.png', img, content_type='image/png'), 'title': 'test'}
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res = self.client.post(picture_url, data=data, format='multipart')
        self.picture_uid = res.data['id']
        self.client.credentials(HTTP_AUTHORIZATION='')

    def test_get_zero_check(self):
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res = self.client.get(self.url)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 0)

    def test_post_with_token(self):
        comment = 'test_comment'
        goodbad = True
        data = {'comment':comment, 'goodbad': goodbad, 'picture_id': self.picture_uid, 'user_uid': self.user_uid }
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res = self.client.post(self.url, data=data)
        self.assertEqual(res.status_code, 201)
        self.assertEqual(res.data['comment'], comment)

    def test_post_no_token(self):
        comment = 'test_comment'
        goodbad = True
        data = {'comment':comment, 'goodbad': goodbad, 'picture_id': self.picture_uid, 'user_uid': self.user_uid }
        res = self.client.post(self.url, data=data)
        self.assertEqual(res.status_code, 401)

    def test_post_no_user(self):
        comment = 'test_comment'
        goodbad = True
        data = {'comment':comment, 'goodbad': goodbad, 'picture_id': self.picture_uid}
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res = self.client.post(self.url, data=data)
        self.assertEqual(res.status_code, 400)

    def test_post_no_picture(self):
        comment = 'test_comment'
        goodbad = True
        data = {'comment':comment, 'goodbad': goodbad, 'user_uid': self.user_uid }
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res = self.client.post(self.url, data=data)
        self.assertEqual(res.status_code, 400)

    def test_post_no_comment(self):
        goodbad = True
        data = {'goodbad': goodbad, 'picture_id': self.picture_uid, 'user_uid': self.user_uid }
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res = self.client.post(self.url, data=data)
        self.assertEqual(res.status_code, 400)

    def test_post_no_goodbad(self):
        comment = 'test_comment'
        data = {'comment':comment, 'picture_id': self.picture_uid, 'user_uid': self.user_uid }
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res = self.client.post(self.url, data=data)
        self.assertEqual(res.status_code, 400)

    def test_get(self):
        comment = 'test_comment'
        goodbad = True
        data = {'comment':comment, 'goodbad': goodbad, 'picture_id': self.picture_uid, 'user_uid': self.user_uid }
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res = self.client.post(self.url, data=data)
        res = self.client.get(self.url + res.data['id'] + '/')
        self.assertEqual(res.data['comment'], comment)

    def test_post_with_another_comment(self):
        comment = 'test_comment'
        goodbad = True
        data = {'comment':comment, 'goodbad': goodbad, 'picture_id': self.picture_uid, 'user_uid': self.user_uid }
        self.client.credentials(HTTP_AUTHORIZATION=self.token)
        res = self.client.post(self.url, data=data)
        another_comment = res.data['id']
        data = {'comment':comment, 'goodbad': goodbad, 'picture_id': self.picture_uid, 'user_uid': self.user_uid, 'another_comment':another_comment }
        res = self.client.post(self.url, data=data)
        self.assertEqual(str(res.data['another_comment']), another_comment)