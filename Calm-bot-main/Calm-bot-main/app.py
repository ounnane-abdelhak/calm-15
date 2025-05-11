from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from gpt_index import SimpleDirectoryReader, GPTSimpleVectorIndex, LLMPredictor, PromptHelper
from langchain.chat_models import ChatOpenAI
import gradio as gr
import sys
import os
import logging
from dotenv import load_dotenv, dotenv_values

app = Flask(__name__)
load_dotenv()
config = dotenv_values('.env')

CORS(app, origins=[config.get('CLIENT_URL')])

# if app.config['LOG_WITH_GUNICORN']:
#     gunicorn_error_logger = logging.getLogger('gunicorn.error')
#     app.logger.handlers.extend(gunicorn_error_logger.handlers)
#     app.logger.setLevel(logging.DEBUG)


# Set OpenAI API key
os.environ["OPENAI_API_KEY"] = config.get('OPENAI_API_KEY')

# Define the function to construct the index
def construct_index(directory_path):
    max_input_size = 4096
    num_outputs = 512
    max_chunk_overlap = 20
    chunk_size_limit = 600

    prompt_helper = PromptHelper(max_input_size, num_outputs, max_chunk_overlap, chunk_size_limit=chunk_size_limit)

    llm_predictor = LLMPredictor(llm=ChatOpenAI(temperature=0.7, model_name="gpt-3.5-turbo", max_tokens=num_outputs))

    documents = SimpleDirectoryReader(directory_path).load_data()

    index = GPTSimpleVectorIndex(documents, llm_predictor=llm_predictor, prompt_helper=prompt_helper)

    index.save_to_disk('index.json')

    return index

# Define the function to generate bot response
def generate_response(input_text):
    index = GPTSimpleVectorIndex.load_from_disk('index.json')
    response = index.query(input_text, response_mode="compact")
    return response.response

# Define the API endpoint
@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    
    input_text = request.json['input_text']
    response = generate_response(input_text)
    
    my_resp = make_response(jsonify({'response': response}))
    my_resp.headers['Access-Control-Allow-Origin'] = '*'
    return my_resp

@app.route('/api/chatbot/reload',  methods=['POST'])
def reload():
   
    if os.name == 'nt':  # Windows
        sys.argv[0] = sys.argv[0] + ".exe"
        os.execl(sys.executable, sys.executable, *sys.argv)
    else:  # Linux
        os.execv(sys.executable, [sys.executable] + sys.argv)


@app.route('/api/chatbot/hello', methods=['GET'])
def hello():
    
    payload =  jsonify(
        success=True,
        message="Hello from your chatbot!",
        data={},
    )

    my_resp = make_response(payload)
    my_resp.status_code = 200

    return my_resp

if __name__ == '__main__':
    # Construct the index when the Flask app starts
    index = construct_index("docs")
    app.run(debug=False)
