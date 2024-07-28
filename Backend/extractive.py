from summarizer.sbert import SBertSummarizer
from googletrans import Translator

def generate_extractive(body):
    try:
        model = SBertSummarizer('paraphrase-MiniLM-L6-v2')
        result = model(body,0.5)
    except Exception as e:
        print(f"An error occurred: {e}")
        result = "0"
    return result


def generate_extr_transl(eng_sum):

    final_summary_length = len(eng_sum)

    translator=Translator()
    hindi_translated_summary = ""
    gujarati_translated_summary =""
    max_length = 3000
    text=eng_sum
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

    return final_summary_length, hindi_translated_summary, gujarati_translated_summary


