from cgi import test
from django.test import TestCase
from pictdata.models import PictDataModel
from accounts.models import CustomUser

class PictureTestCase(TestCase):
    # def setUp(self):

    def test_user_check(self):
        CustomUser.objects.create(username='test', password='testpass1')
        test = CustomUser.objects.get(username='test')

        self.assertEqual(test.username, 'test')
        self.assertEqual(test.password, 'testpass1')