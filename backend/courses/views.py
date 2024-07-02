from rest_framework import generics, viewsets, status
from rest_framework.decorators import permission_classes, parser_classes, api_view
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Course, Category, Quiz, Element,UserCourseProgress
from .serializers import CourseSerializer, CategorySerializer, QuizSerializer, ElementSerializer
from django.contrib.auth import get_user_model
import pandas as pd
import io
from reportlab.pdfgen import canvas
from io import BytesIO
from django.core.files.base import ContentFile
from .models import Certification
from django.utils import timezone
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.enums import TA_CENTER
from django.conf import settings

User = get_user_model()
@api_view(['POST'])
@permission_classes([AllowAny])
def start_course(request, course_id):
    user_id = request.data.get('user')
    user = get_object_or_404(User, id=user_id)
    course = get_object_or_404(Course, id=course_id)
    
    UserCourseProgress.objects.get_or_create(user=user, course=course)
    
    return Response({"message": "Course started successfully."}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def complete_course(request, course_id):
    user_id = request.data.get('user')
    user = get_object_or_404(User, id=user_id)
    course = get_object_or_404(Course, id=course_id)
    
    progress = get_object_or_404(UserCourseProgress, user=user, course=course)
    progress.passed = True
    progress.completed_at = timezone.now()  # Set the completion time
    progress.save()
    
    return Response({"message": "Course marked as complete."}, status=status.HTTP_200_OK)

@permission_classes([AllowAny])
class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        user_id = self.request.data.get('created_by')
        user = get_object_or_404(User, id=user_id)
        course = serializer.save(created_by=user)

        quiz_file = self.request.FILES.get('quizFile')
        if quiz_file:
            try:
                self.process_quiz_file(quiz_file, course)
            except Exception as e:
                print(f"Error processing quiz file: {e}")
                course.delete()  # Rollback course creation if quiz processing fails
                raise ValueError(f"Error creating course: {e}")

    def process_quiz_file(self, quiz_file, course):
        try:
            df = pd.read_excel(quiz_file)
            required_columns = ['question', 'response', 'option1', 'option2']
            if not all(column in df.columns for column in required_columns):
                raise ValueError(f"Excel file is missing one of the required columns: {required_columns}")
            
            quiz = Quiz.objects.create(course=course, title=f"{course.title} Quiz")
            
            for index, row in df.iterrows():
                Element.objects.create(
                    quiz=quiz,
                    question=row['question'],
                    response=row['response'],
                    option1=row['option1'],
                    option2=row['option2']
                )
                
        except Exception as e:
            print(f"Error processing quiz file: {e}")
            raise ValueError(f"Error processing quiz file: {e}")




@permission_classes([AllowAny])
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

@permission_classes([AllowAny])
class CoursesByCategoryView(APIView):
    def get(self, request, category_id):
        category = get_object_or_404(Category, id=category_id)
        courses = Course.objects.filter(category=category)
        serializer = CourseSerializer(courses, many=True, context={'request': request})
        return Response(serializer.data)

@permission_classes([AllowAny])
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

@permission_classes([AllowAny])
class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

@method_decorator(csrf_exempt, name='dispatch')
@permission_classes([AllowAny])
class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        user_id = self.request.data.get('created_by')
        user = get_object_or_404(User, id=user_id)
        course = serializer.save(created_by=user)

        quiz_file = self.request.FILES.get('quizFile')
        if quiz_file:
            try:
                self.process_quiz_file(quiz_file, course)
            except Exception as e:
                print(f"Error processing quiz file: {e}")
                course.delete()  # Rollback course creation if quiz processing fails
                raise ValueError(f"Error creating course: {e}")

    def process_quiz_file(self, quiz_file, course):
        try:
            df = pd.read_excel(quiz_file)
            required_columns = ['question', 'response', 'option1', 'option2']
            if not all(column in df.columns for column in required_columns):
                raise ValueError(f"Excel file is missing one of the required columns: {required_columns}")
            
            quiz = Quiz.objects.create(course=course, title=f"{course.title} Quiz")
            
            for index, row in df.iterrows():
                Element.objects.create(
                    quiz=quiz,
                    question=row['question'],
                    response=row['response'],
                    option1=row['option1'],
                    option2=row['option2']
                )
                
        except Exception as e:
            print(f"Error processing quiz file: {e}")
            raise ValueError(f"Error processing quiz file: {e}")

@method_decorator(csrf_exempt, name='dispatch')
@permission_classes([AllowAny])
class CourseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    parser_classes = [MultiPartParser, FormParser]

@permission_classes([AllowAny])
class CoursesByTeacherView(APIView):
    def get(self, request, teacher_id):
        teacher = get_object_or_404(User, id=teacher_id)
        courses = Course.objects.filter(created_by=teacher)
        serializer = CourseSerializer(courses, many=True, context={'request': request})
        return Response(serializer.data)

@permission_classes([AllowAny])
class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

@permission_classes([AllowAny])
class ElementViewSet(viewsets.ModelViewSet):
    queryset = Element.objects.all()
    serializer_class = ElementSerializer

@permission_classes([AllowAny])
class UploadQuizView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, course_id):
        course = get_object_or_404(Course, id=course_id)
        file = request.FILES.get('file')
        
        if not file:
            return Response({"error": "No file uploaded."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            df = pd.read_excel(file)
            required_columns = ['question', 'response', 'option1', 'option2']
            if not all(column in df.columns for column in required_columns):
                raise ValueError(f"Excel file is missing one of the required columns: {required_columns}")

            quiz = Quiz.objects.create(course=course, title=f"{course.title} Quiz")
            
            for index, row in df.iterrows():
                Element.objects.create(
                    quiz=quiz,
                    question=row['question'],
                    response=row['response'],
                    option1=row['option1'],
                    option2=row['option2']
                )
            
            return Response({"success": "Quiz created successfully."}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
class QuizDetailView(generics.RetrieveAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

    def get_object(self):
        course_id = self.kwargs['course_id']
        return get_object_or_404(Quiz, course__id=course_id)


@api_view(['POST'])
@permission_classes([AllowAny])
def submit_quiz(request, course_id):
    user_id = request.data.get('user')
    user = get_object_or_404(User, id=user_id)
    course = get_object_or_404(Course, id=course_id)
    quiz = get_object_or_404(Quiz, course=course)

    answers = request.data.get('answers')
    total_questions = quiz.elements.count()
    correct_answers = 0

    for element in quiz.elements.all():
        question_id = str(element.id)
        if answers.get(question_id) == element.response:
            correct_answers += 1

    score = (correct_answers / total_questions) * 100
    passed = score >= 60

    progress, created = UserCourseProgress.objects.get_or_create(user=user, course=course)
    progress.quiz_score = score
    progress.passed = passed
    if passed:
        progress.completed_at = timezone.now()
    progress.save()

    if passed:
        generate_certificate_function(user, course)

    return Response({"score": score, "passed": passed}, status=status.HTTP_200_OK)

def generate_certificate_function(user, course):
    progress = get_object_or_404(UserCourseProgress, user=user, course=course)

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)

    styles = getSampleStyleSheet()
    title_style = styles['Title']
    title_style.fontSize = 24
    title_style.alignment = TA_CENTER
    title_style.spaceAfter = 20

    subtitle_style = ParagraphStyle(
        name='Subtitle',
        parent=styles['Normal'],
        fontSize=18,
        leading=22,
        alignment=TA_CENTER,
        spaceAfter=15,
    )

    normal_style = ParagraphStyle(
        name='Normal',
        parent=styles['Normal'],
        fontSize=14,
        leading=20,
        alignment=TA_CENTER,
    )

    elements = []

    # Corrected Logo Path
    logo_path = f'{settings.MEDIA_ROOT}/certificates/invader.png'  # Ensure you have a logo.png file in your media/certificates directory
    try:
        elements.append(Image(logo_path, width=2*inch, height=2*inch))
    except Exception as e:
        print(f"Error loading logo: {e}")

    elements.append(Spacer(1, 0.5 * inch))
    elements.append(Paragraph("Certificate of Completion", title_style))
    elements.append(Paragraph(f"This is to certify that", subtitle_style))
    elements.append(Paragraph(f"{user.prenom} {user.nom}", title_style))
    elements.append(Paragraph(f"has successfully completed the course", subtitle_style))
    elements.append(Paragraph(f"{course.title}", title_style))
    completion_date = progress.completed_at.strftime('%B %d, %Y') if progress.completed_at else "Date not available"
    elements.append(Paragraph(f"on {completion_date}", normal_style))
    elements.append(Spacer(1, 0.5 * inch))
    elements.append(Spacer(1, 0.5 * inch))
    elements.append(Paragraph("_____________________________", normal_style))
    elements.append(Paragraph("Instructor Signature", normal_style))

    doc.build(elements)

    buffer.seek(0)
    pdf_content = buffer.getvalue()
    buffer.close()

    certification = Certification.objects.create(
        user=user,
        course=course,
        certificate_file=ContentFile(pdf_content, name=f'certificate_{user.prenom}_{user.nom}_{course.id}.pdf')
    )

    return certification


@api_view(['POST'])
@permission_classes([AllowAny])
def generate_certificate(request, course_id):
    user_id = request.data.get('user')
    user = get_object_or_404(User, id=user_id)
    course = get_object_or_404(Course, id=course_id)
    progress = get_object_or_404(UserCourseProgress, user=user, course=course)

    if not progress.passed:
        return Response({"error": "User has not passed the course"}, status=status.HTTP_400_BAD_REQUEST)

    certification = generate_certificate_function(user, course)

    return Response({
        "message": "Certificate generated successfully",
        "certificate_url": certification.certificate_file.url
    })