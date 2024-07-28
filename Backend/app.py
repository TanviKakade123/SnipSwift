from flask import Flask, jsonify, request
from flask_cors import CORS
import abstractive
from transcript import extract_id, get_transcript
import extractive

app = Flask(__name__)
CORS(app)

@app.route('/transcript', methods=['GET'])
def transcript():
    data = {}
    url = request.args.get("url", None)
    vid_id = extract_id(url)
    
    if not vid_id:
        return build_response({"message": "Failed", "error": "No video id found, please provide valid video id."})

    if str(vid_id) == "False":
        return build_response({"message": "Failed", "error": "Video id invalid, please provide valid video id."})

    Transcript, data['original_trans_hin'], data['original_trans_guj'] = get_transcript(vid_id)
    if not Transcript:
        return build_response({"message": "Failed", "error": "API's not able to retrieve Video Transcript."})

    data['message'] = "Success"
    data['original_trans'] = Transcript
    return build_response({"data": data})


@app.route('/extractive_summary', methods=['GET'])
def extractive_summary():
    data = {}
    extractive_data = {}
    url = request.args.get("url", None)
    vid_id = extract_id(url)
    
    if not vid_id:
        return build_response({"message": "Failed", "error": "No video id found, please provide valid video id."})

    if str(vid_id) == "False":
        return build_response({"message": "Failed", "error": "Video id invalid, please provide valid video id."})

    Transcript, data['original_trans_hin'], data['original_trans_guj'] = get_transcript(vid_id)
    if not Transcript:
        return build_response({"message": "Failed", "error": "API's not able to retrieve Video Transcript."})

    extr_sum = extractive.generate_extractive(Transcript,url)
    if extr_sum == "0":
        return build_response({"message": "Failed", "error": "Failed to generate extractive summary."})

    data['message'] = "Success"
    extractive_data['eng_summary'] = extr_sum
    extractive_data['final_summ_length'], extractive_data['hind_summary'], extractive_data['guj_summary'] = extractive.generate_extr_transl(extr_sum)
    data['extractive_data'] = extractive_data
    return build_response({"data": data})


@app.route('/abstractive_summary', methods=['GET'])
def abstractive_summary():
    data = {}
    abstractive_data = {}
    url = request.args.get("url", None)
    vid_id = extract_id(url)
    
    if not vid_id:
        return build_response({"message": "Failed", "error": "No video id found, please provide valid video id."})

    if str(vid_id) == "False":
        return build_response({"message": "Failed", "error": "Video id invalid, please provide valid video id."})

    Transcript, data['original_trans_hin'], data['original_trans_guj'] = get_transcript(vid_id)
    if not Transcript:
        return build_response({"message": "Failed", "error": "API's not able to retrieve Video Transcript."})

    abstr_sum = abstractive.abstractive(Transcript)
    if not abstr_sum:
        return build_response({"message": "Failed", "error": "Failed to generate abstractive summary."})

    data['message'] = "Success"
    abstractive_data['eng_summary'] = abstr_sum
    abstractive_data['hind_summary'], abstractive_data['guj_summary'] = abstractive.generate_abstr_transl(abstr_sum)
    data['abstractive_data'] = abstractive_data
    return build_response({"data": data})


def build_response(body):
    response = jsonify(body)
    return response


if __name__ == '__main__':
    app.run()
