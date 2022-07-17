
import spacy
import mysql.connector
import sys

examId = str(sys.argv[1])
examineeId = str(sys.argv[2])

mydb = mysql.connector.connect(
        host= '127.0.0.1',
        user= 'root',
        password= 'Nosseralaa',
        database= 'examination-system',
        auth_plugin='mysql_native_password'
    )
mycursor = mydb.cursor()
mycursor.execute("SELECT examinee_Examinee_ID, exam_Exam_ID, question_Question_ID, QuestionType, examinee_answer, CorrectAnswer, QuestionTitle, Option_1, Option_2, Option_3, Option_4, Option_5, Option_6 FROM examinee_answer JOIN question ON examinee_answer.question_Question_ID = Question_ID  WHERE examinee_Examinee_ID = "+examineeId+" AND exam_Exam_ID ="+ examId)
myresult = mycursor.fetchall()
# print('#########result#########' , myresult)


mcqResult = ""
essayResult = ""
for x in myresult:
    if 'mcq' in x[3] or 'true or false' in x[3]:
        print("mcq")
        examineeAnswer = x[4]
        correctAnswer = x[5]
        questionTitle = x[6]
        print(questionTitle)
        option_1 = x[7]
        option_2 = x[8]
        option_3 = x[9]
        option_4 = x[10]
        option_5 = x[11]
        option_6 = x[12]
        questionId = x[2]
        print("$$$$$$$$$$$$",x , questionId)
        questionType = str(x[3])
        print(examineeAnswer)
        print(correctAnswer)
        if examineeAnswer == correctAnswer:
            print("correct")
            mcqResult = "correct"
        else:
            print("wrong")
            mcqResult = "incorrect"

        mycursor = mydb.cursor()
        sql = ("INSERT INTO answer_evaluation(exam_Exam_ID, examinee_Examinee_ID, question_Question_ID, question_type, examinee_answer, correct_answer, result, QuestionTitle, Option_1, Option_2, Option_3, Option_4, Option_5, Option_6) VALUES (%s, %s, %s, %s, %s, %s, %s,%s, %s, %s, %s, %s, %s, %s)")
        value = (examId,examineeId, questionId, questionType, examineeAnswer, correctAnswer, mcqResult, questionTitle, option_1, option_2, option_3, option_4, option_5, option_6)
        mycursor.execute(sql, value)
        mydb.commit()
        print (mcqResult)
    if 'essay' in x[3]:
        print("essay")
        print('question title essay',x[6])
        examineeAnswer = x[4]
        correctAnswer = x[5]
        questionTitle = x[6]
        option_1 = x[7]
        option_2 = x[8]
        option_3 = x[9]
        option_4 = x[10]
        option_5 = x[11]
        option_6 = x[12]
        questionId = x[2]
        questionType = x[3]
        print(examineeAnswer)
        print(correctAnswer)
        if examineeAnswer == "":
            print("############~inside null#############")
            sql = ("INSERT INTO answer_evaluation(exam_Exam_ID, examinee_Examinee_ID, question_Question_ID, question_type, examinee_answer, correct_answer, result, QuestionTitle) VALUES (%s, %s, %s, %s, %s, %s, %s,%s)")
            value = (examId,examineeId, questionId, questionType, examineeAnswer, correctAnswer, essayResult, questionTitle)
            mycursor.execute(sql, value)
            mydb.commit()
        else:
            print("$$$$$$$$$$$$$$$inside else#############",examineeAnswer)
            nlp = spacy.load('en_core_web_lg')
            doc1 = nlp(correctAnswer)
            doc2 = nlp(examineeAnswer)
            print(doc1.similarity(doc2))
            essayResult = doc1.similarity(doc2)
            print("essay",x, questionId)
            mycursor = mydb.cursor()
            sql = ("INSERT INTO answer_evaluation(exam_Exam_ID, examinee_Examinee_ID, question_Question_ID, question_type, examinee_answer, correct_answer, result, QuestionTitle) VALUES (%s, %s, %s, %s, %s, %s, %s,%s)")
            value = (examId,examineeId, questionId, questionType, examineeAnswer, correctAnswer, essayResult, questionTitle)
            
            mycursor.execute(sql, value)
            mydb.commit()