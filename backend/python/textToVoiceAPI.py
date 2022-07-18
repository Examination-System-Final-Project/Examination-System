from gtts import gTTS
import sys
import mysql.connector
import shutil
import os
from os.path import exists
questionId = sys.argv[1]
print("IDDIDIDIDIDIDDI ",sys.argv)



def TTV (questionId):

    mydb = mysql.connector.connect(
        host = 'sql11.freemysqlhosting.net',
        user = 'sql11507096',
        password = '8hn9EVJzLJ',
        database = 'sql11507096',
        port = '3306',
        auth_plugin='mysql_native_password'
    )


    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM question WHERE Question_ID = "+questionId)
    myresult = mycursor.fetchall()
    print(myresult[0][3])

    if(myresult[0][1] == "essay"):
            text = str(myresult[0][3])
    else:
        text = str(myresult[0][3])
        text += ', Answer number 1, '
        text += str(myresult[0][5])
        text += ', Answer number 2, '
        text += str(myresult[0][6])

        if(myresult[0][7] != None and myresult[0][7] != "undefined"):
            text += ', Answer number 3, '
            text += str(myresult[0][7])

        if(myresult[0][8] != None and myresult[0][8] != "undefined"):
            text += ', Answer number 4, '
            text += str(myresult[0][8])

        if(myresult[0][9] != None and myresult[0][9] != "undefined"):
            text += ', Answer number 5, '
            text +=str(myresult[0][9])

        if(myresult[0][10] != None and myresult[0][10] != "undefined"):
            text += ', Answer number 6, '
            text +=str(myresult[0][10])

    print(exists('../frontEnd/src/assets/questionsAudio/question'+questionId+'.mp3'))
    if exists('../frontEnd/src/assets/questionsAudio/question'+questionId+'.mp3'):
        os.remove('../frontEnd/src/assets/questionsAudio/question'+questionId+'.mp3')
        print("file found and deleted")


    tts = gTTS(text, lang='en')
    print("text converted succs")
    parsID = str(myresult[0][0])
    t="question"+parsID+".mp3"
    tts.save(t)
    
    shutil.move(t, '../frontEnd/src/assets/questionsAudio')
    print('file moved to assets')

TTV(questionId)