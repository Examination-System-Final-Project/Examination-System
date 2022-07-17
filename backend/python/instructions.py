from gtts import gTTS
import sys
import mysql.connector
import shutil




    
text = "Exam Instructions, To navigate to the next question, press, the right arrow key. To navigate to the previous question, press, the left arrow key. To listen to the question you are in, press, space. To answer an essay question, first, press, the arrow up button to activate the mic, second, answer the question with your voice, third, press, the arrow down button. To answer a multiple-choice question, use the number 1 button, for the first answer, the number 2 button, for the second answer, the number 3 button, for the third answer, the number 4 button, for the fourth answer. To stop any instruction while you are listening to it, press, escape button. To listen to the instructions again during the exam, press, the shift button. To start the exam, press, the number zero button."

tts = gTTS(text, lang='en')
print("converted succs")


t= 'examMainInstructions.mp3'
tts.save(t)
shutil.move(t, '../../frontEnd/src/assets/examAudioInstructions')
print("moved succs")