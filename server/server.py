from flask import Flask, request, jsonify
from transformers import BartForConditionalGeneration, BartTokenizer
import torch

app = Flask(__name__)

tokenizer = BartTokenizer.from_pretrained('facebook/bart-large-cnn')
model = BartForConditionalGeneration.from_pretrained('facebook/bart-large-cnn')
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json(force=True)
    text = data['text']

    # Tokenize text
    inputs = tokenizer([text], max_length=1024, return_tensors='pt', truncation=True)
    inputs = inputs.to(device)

    # Generate summary
    summary_ids = model.generate(inputs['input_ids'], num_beams=4, max_length=100, early_stopping=True)
    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(debug=True, port=8080)

