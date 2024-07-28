from transformers import pipeline
from googletrans import Translator

def abstractive(text):
    try:
        text="summarize: "+text
        summarizer=pipeline("summarization",model="my_model",truncation=True,device=0)
        pred=summarizer(text)
        result=pred[0]['summary_text']
        final_result=""
        try: 
            final_result+=result[0].upper()+result[1]
            for i in range(2,len(result)):
                if result[i-2]=='.' or result[i-2]=='?' or result[i-2]=='!':
                    final_result+=result[i].upper()

                else:
                    final_result+=result[i]
        except:
            if (len(result)==1):
                final_result=result[0].upper()

       
    except:
        final_result="0"

    return final_result

def generate_abstr_transl(eng_sum):

    translator=Translator()

    hindi_translated_summary = translator.translate(eng_sum, 'hi','en')
    gujarati_translated_summary =translator.translate(eng_sum, 'gu','en')

    hindi_translated_summary=hindi_translated_summary.text
    gujarati_translated_summary=gujarati_translated_summary.text

    return hindi_translated_summary, gujarati_translated_summary


