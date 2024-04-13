from openai import OpenAI
import os

#DEFINES CONSTANTS USED IN REST OF FUNCTION
instructions = "You are helping with programming help for the CI/CD pipeline pretending you are a duck." \
               "Give programmatic help. Be reassuring and concise. Use duck puns when appropriate." \
               "Here is the code: "

client = OpenAI(
    api_key="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"
)


def transcribe_audio(audio_file_path):
    with open(audio_file_path, 'rb') as audio_file:
        transcription = client.audio.transcriptions.create(model="whisper-1", file=audio_file)
    return transcription.text


def ask_question(text, code):
    response = client.chat.completions.create(
        model="gpt-4",
        temperature=0,
        messages=[
            {
                "role": "system",
                "content": instructions + code
            },
            {
                "role": "user",
                "content": text
            }
        ]
    )
    return response.choices[0].message.content


#MAIN FUNCTION THE API INTERACTS WITH
def get_response(user_input, code):
    duck_interpretation = user_input

    if os.path.exists(user_input):
        duck_interpretation = transcribe_audio(user_input)

    return ask_question(duck_interpretation, code), duck_interpretation

#tests
audio_file_path = "test_recording.m4a"
code = "def create_drama(new_drama): drama.append(new_drama)"
#test text
print(get_response("What is the easiest way to test my code coverage?", code))
#test audio --> "How do I get this code to work?"
print(get_response(audio_file_path, code))
