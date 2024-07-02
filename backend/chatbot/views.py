from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import openai
import json

openai.api_key = "sk-proj-JpepWLZcApyIo034yZVYT3BlbkFJeKWlpShxB7oV2kSwSWzM"

def chat(prompt):
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        return f"An error occurred: {e}"

@csrf_exempt
def predict(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        text = data.get('message')
        response = chat(text)
        return JsonResponse({"answer": response})
    return JsonResponse({"error": "Invalid request method"}, status=405)
