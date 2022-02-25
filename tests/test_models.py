from django.test import TestCase
from pictdata.models import PictDataModel, CommentModel, RandomQuestionModel
from accounts.models import CustomUser

class CustomUserTestCase(TestCase):
    def setUp(self):
        CustomUser.objects.create(username='test', password='testpass1', email='testuser@test.com')

    def test_check_data_one(self):
        data = CustomUser.objects.all()
        self.assertEqual(data.count(), 1)
        
    def test_customuser_check(self):
        test = CustomUser.objects.get(username='test')

        self.assertEqual(test.username, 'test')
        self.assertEqual(test.password, 'testpass1')
        self.assertEqual(test.email, 'testuser@test.com')
        self.assertFalse(test.is_staff)
        self.assertTrue(test.is_active)


class PictureTestCase(TestCase):
    def setUp(self):
        CustomUser.objects.create(username='defalut', password='defalut001', email='defalut@def.com')

    def test_zero_check(self):
        tmp = PictDataModel.objects.all()
        self.assertEqual(tmp.count(), 0)

    def test_picture_check(self):
        user=CustomUser.objects.get(username='defalut')
        dummy_adress = r'C.\media\test_image\test.png'
        PictDataModel.objects.create(user=user, title='dummy', picture=dummy_adress)
        getData = PictDataModel.objects.get(title='dummy')
        
        self.assertEqual(getData.user, user)
        self.assertEqual(getData.title, 'dummy')
        self.assertEqual(getData.picture, dummy_adress)

    def test_anotherPict(self):
        user=CustomUser.objects.get(username='defalut')

        dummy_adress1 = r'.\media\test_image\test1.png'
        dummy_adress2 = r'.\media\test_image\test2.png'

        PictDataModel.objects.create(user=user, title='dummy1', picture=dummy_adress1)
        tmp1 = PictDataModel.objects.get(title='dummy1')

        PictDataModel.objects.create(user=user, title='dummy2', picture=dummy_adress2, anotherPict=tmp1)
        tmp2 = PictDataModel.objects.get(title='dummy2')

        self.assertEqual(tmp2.anotherPict, tmp1)


class CommentsTestCase(TestCase):
    def setUp(self):
        CustomUser.objects.create(username='defalut', password='defalut001', email='defalut@def.com')
        user = CustomUser.objects.get(username='defalut')
        dummy_adress = r'C.\media\test_image\test.png'
        PictDataModel.objects.create(user=user, title='dummy', picture=dummy_adress)

    def test_zero_check(self):
        tmp = CommentModel.objects.all()
        self.assertEqual(tmp.count(), 0)

    def test_comment_register(self):
        user = CustomUser.objects.get(username='defalut')
        picture = PictDataModel.objects.get(title='dummy')
        comment = 'test'
        goodbad = True
        CommentModel.objects.create(user=user, picture=picture, comment=comment, goodbad=goodbad)

        tmp = CommentModel.objects.get(user=user)

        self.assertEqual(tmp.comment, comment)


class QuestionModelTestCase(TestCase):
    def test_zero_check(self):
        tmp = RandomQuestionModel.objects.all()

        self.assertEqual(tmp.count(), 0)

    def test_question_register(self):
        question = '質問例'
        
