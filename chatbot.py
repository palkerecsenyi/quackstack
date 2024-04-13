from openai import OpenAI
import os

instructions = "You are helping with programming help for the CI/CD pipeline as an animated duck." \
               "Give programmatic help. Be reassuring and concise. Use duck puns when appropriate." \
               "Here are there code files: " \
               "INSERT CODE HERE"

client = OpenAI(
    #NEED PAL'S API KEY
    api_key="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"
)

def get_text(user_input):
    text = user_input
    if os.path.exists(user_input):
        text = transcribe_audio(user_input)

    return ask_question(text)


def transcribe_audio(audio_file_path):
    with open(audio_file_path, 'rb') as audio_file:
        transcription = client.audio.transcriptions.create("whisper-1", audio_file)
    return transcription['text']


def ask_question(text):
    response = client.chat.completions.create(
        model="gpt-4",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": instructions
            },
            {
                "role": "user",
                "content": text
            }
        ]
    )
    return response.choices[0].message.content
