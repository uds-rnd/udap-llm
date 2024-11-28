import os
from flask import Flask, request
import json
from flask_cors import CORS
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

os.environ['OPENAI_API_KEY'] = ''
llm = ChatOpenAI(model='gpt-4o')
app = Flask(__name__)
CORS(app)

# # 템플릿 쿼리 작성
# template_text = "안녕하세요, 제 이름은 {name}이고, 나이는 {age}살입니다."

# # PromptTemplate 인스턴스를 생성
# prompt_template = PromptTemplate.from_template(template_text)

# # 자연어로 부터 키워드 빼내서 템플릿에 넣기
# filled_prompt = prompt_template.format(name="홍길동", age=30)

# filled_prompt

# 요청 받은 자연어 텍스트에서 특정 키워드만 뽑아 JSON 형태로 바꿔주는 Instructions 작성

def read_file(path):
    template_path = './' + path
    with open(template_path, 'r', encoding='utf-8') as file:
        assistantInstruct = file.read()
        print(assistantInstruct, flush=True)
        print(type(assistantInstruct), flush=True)
    return assistantInstruct

def make_langchain():
    instructions = read_file("llm_instructions.txt")
    prompt = ChatPromptTemplate.from_template(instructions)
    chain_cycle = prompt | llm
    return chain_cycle

@app.route('/make_keyword', methods=['POST'])
def make_keyword():
    req = request.get_json()
    user_ques = req["message"]

    tmp_langChain = make_langchain()
    response = tmp_langChain.invoke({"input": user_ques})

    return json.dumps({"response": response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)











