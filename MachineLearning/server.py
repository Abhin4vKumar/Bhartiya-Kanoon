from pymongo.mongo_client import MongoClient
#classification
import spacy
import datetime
from spacy.matcher import PhraseMatcher
from spacy.tokens import Doc
# translate
from googletrans import Translator
# summary 
import nltk
import time
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.probability import FreqDist
nlp = spacy.load("en_core_web_sm")
nltk.download('punkt')
nltk.download('stopwords')

import os
import pyrebase
import sys

config = {
  "apiKey": "AIzaSyChRhfdj2OHN5iOyrl1oO5Gl9A7zxJGu5Y",
  "authDomain": "bhartiya-kanoon-1.firebaseapp.com",
  "projectId": "bhartiya-kanoon-1",
  "storageBucket": "bhartiya-kanoon-1.appspot.com",
  "messagingSenderId": "127739662566",
  "appId": "1:127739662566:web:aaa5514db3415fd100ab27",
  "measurementId": "G-J1JW88WNW6",
  "serviceAccount": "ServiceAccount.json",
  "databaseURL": "https://bhartiya-kanoon-1-default-rtdb.firebaseio.com"
}
firebase = pyrebase.initialize_app(config)
storage = firebase.storage()
os.system('cls')


def classify(document_text):
    keywords = {
        'petition': ['petition', 'filed a petition', 'petitioner'],
        'proof': ['proof', 'evidence', 'proof of'],
        'judgment': ['judgment', 'verdict', 'judged']
    }

    matcher = PhraseMatcher(nlp.vocab)
    for label, patterns in keywords.items():
        patterns = [nlp(text) for text in patterns]
        matcher.add(label, None, *patterns)

    def classify_document(text):
        doc = nlp(text)
        matches = matcher(doc)
        
        if not matches:
            return "Unknown"
        
        label_counts = {}
        for match_id, start, end in matches:
            label = nlp.vocab.strings[match_id]
            if label not in label_counts:
                label_counts[label] = 0
            label_counts[label] += 1
        
        classification = max(label_counts, key=label_counts.get)
        return classification

    result = classify_document(document_text)
    result = "This document is classified as:  " + result.upper() + "\n\n"
    return result 

def summarise(text):
    def calculate_sentence_scores(sentences, freq_table):
        sentence_scores = {}

        for sentence in sentences:
            for word, freq in freq_table.items():
                if word in sentence.lower():
                    if sentence in sentence_scores:
                        sentence_scores[sentence] += freq
                    else:
                        sentence_scores[sentence] = freq

        return sentence_scores

    def generate_summary(text, num_sentences=5):
        stop_words = set(stopwords.words("english"))
        words = word_tokenize(text)

        # Remove stopwords and punctuation
        words = [word.lower() for word in words if word.isalnum() and word.lower() not in stop_words]

        # Calculate word frequency
        freq_table = FreqDist(words)

        # Tokenize the text into sentences
        sentences = sent_tokenize(text)

        # Calculate sentence scores
        sentence_scores = calculate_sentence_scores(sentences, freq_table)

        # Sort sentences by their scores in descending order
        sorted_sentences = sorted(sentence_scores.items(), key=lambda x: x[1], reverse=True)

        # Get the top 'num_sentences' sentences as the summary
        summary_sentences = sorted_sentences[:num_sentences]

        # Reconstruct the summary
        summary = []
        for sentence in sentences:
            if sentence in [s for s, _ in summary_sentences]:
                summary.append(sentence)

        return ' '.join(summary)
    summary = generate_summary(text, num_sentences=5)
    return summary

def translate_to(input_text):
    translator = Translator()

    hindi_translation = translator.translate(input_text, src='en', dest='hi')
    
    tamil_translation = translator.translate(input_text, src='en', dest='ta')

    translated_text = f"Summary:\n{input_text}\n\nHindi Translation:\n{hindi_translation.text}\n\nTamil Translation:\n{tamil_translation.text}"
    
    return translated_text      

def startFunction():
    input_file_path = r'temp.txt'
    output_file_path = r'result.txt'
    with open(input_file_path, 'r') as file:
        text = file.read()

    classified = classify(text)
    summary = summarise(text)
    translated = translate_to(summary)

    with open(output_file_path, 'w',encoding='utf-8') as file:
        file.write(classified)
        file.write(translated)

def firebase1(id):
    storage = firebase.storage()
    try:
        storage.download(id,"temp.txt")
    except Exception as e:
        print(e)
    time.sleep(1)
    try:
        startFunction()
    except Exception as e:
        print(e)
    new_id = id + 's'
    # time.sleep(1)
    storage.child(new_id).put("result.txt")
    # time.sleep(5)
    try:
        os.remove("temp.txt")
        os.remove("result.txt")
    except:
        pass
    # return


uri = "mongodb+srv://VerifyBharat:kSMFk6y8YTcOSjcn@verifybharatcluster.qzz6zpt.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri)
# Send a ping to confirm a successful connection
db = client["test"]
collection0 = db["certificates"]
x = 0
while True:
    try:
        result = collection0.find()
        for item in result:
            avail = item['summaryAvailable']
            if avail:
                continue
            id = item['cert_id']
            _id = item['_id']
            print("Successfully generated summary for - ",item['name'])
            time.sleep(5)
            collection0.update_one({"_id":_id},{"$set":{"summaryAvailable":True}})
            try:
                firebase1(id)
            except Exception as e:
                print(e)
                print("xxx")
                print("Not Found")
                pass
    except Exception as e:
        print(e)
    if x%4==0:
        print("w",end="")
        print("a",end="")
        time.sleep(0.5)
        print("i",end="")
        print("t",end="")
        time.sleep(0.5)
        print("i",end="")
        print("n",end="")
        time.sleep(0.5)
        print("g",end="")
        print(".",end="")
        time.sleep(0.5)
        print(".",end="")
        print(".",end="")
        print()
        time.sleep(2)
        os.system('cls')