
from youtube_transcript_api import YouTubeTranscriptApi as yta
from deepmultilingualpunctuation import PunctuationModel
from googletrans import Translator

def transcript_translate(Transcript):
       translator=Translator()
       hindi_translated_summary = ""
       gujarati_translated_summary =""
       max_length = 3000
       text=Transcript
       chunks = []
       while len(text) > max_length:
              break_point = text.rfind(' ', 0, max_length)
              if break_point == -1:
                     break_point = max_length
              chunks.append(text[:break_point])
              text = text[break_point:].strip()
       chunks.append(text)

       translated_chunks_hi = []
       translated_chunks_gu = []
       for chunk in chunks:
              translated_chunk_hi = translator.translate(chunk, src='en', dest='hi').text
              translated_chunks_hi.append(translated_chunk_hi)
              translated_chunk_gu = translator.translate(chunk, src='en', dest='gu').text
              translated_chunks_gu.append(translated_chunk_gu)

       hindi_translated_summary = ' '.join(translated_chunks_hi)
       gujarati_translated_summary=' '.join(translated_chunks_gu)

       return hindi_translated_summary, gujarati_translated_summary

def get_transcript(url):
       try: 
              transcript=yta.get_transcript(url,languages=['en'])
       except Exception as e:
              print(e)       
       model = PunctuationModel()
       final_transcript=" ".join(data['text'] for data in transcript[:10])
       result = model.restore_punctuation(final_transcript)
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

       hin_transl, guj_transl=transcript_translate(final_result)
       return final_result, hin_transl, guj_transl


def extract_id(vid_url):
       if "youtube.com" in vid_url:
              try:
                     video_id = vid_url.split("=")[1]
                     try:
                            video_id = video_id.split("&")[0]
                     except:
                            video_id = "False"
              except:
                      video_id = "False"

       elif "youtu.be" in vid_url:
              try:
                     video_id = vid_url.split("/")[3]
              except:
                     video_id = "False"
       else:
              video_id = "False"

       return video_id
