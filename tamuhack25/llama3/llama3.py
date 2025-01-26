# Activate env: conda activate venv/
# pip install -r requirements.txt
# run: python llama3.py
import boto3
import json
from newspaper import Article, Config
import requests


def getArticleContent(url):
    # prevent being block from page
    user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
    config = Config()
    config.browser_user_agent = user_agent


    article = Article(url)
    article.download()
    article.parse() # Fix later
    return article.text


def main():
    # url = 'https://www.benzinga.com/25/01/43198886/apples-q1-earnings-might-not-miss-a-beat-even-as-iphone-sales-stumble-analyst'
    if len(sys.argv) < 2:
        print("Usage: python llama3.py <url>")
        return
     url = sys.argv[1]
     print("URL:",url)

    # text = "Apple AAPL-0.39% stock has tumbled at the start of the year. BofA Securities advises investors to stay the course but joined a chorus of Wall Street voices expressing concern over flagging iPhone demand. The iPhone is by far Apple’s most important product as it brings in the most revenue. Any drop in iPhone sales is a concern for investors. Wamsi Mohan lowered his price target on Apple shares to $253 from $256 on Friday, while maintaining a Buy rating on the stock. Shares were down 0.6% to $222 in afternoon trading. The stock gained 16% over the past 12 months, is down 11% in January. Mohan wrote that he expects weaker iPhone demand and a prolonged rollout of generative artificial intelligence features to affect sales in the current quarter."
    text = getArticleContent(url) 
    print("Content: ", text)

    print("######################")
    print("Response: ")
    bedrock_runtime = boto3.client(
        service_name='bedrock-runtime',
        region_name='us-west-2',
    )

    prompt = f"Based on the given text: {text}, identify whether the stock is either bullish or bearish. Provide a supporting quote from the text and summarize your reasoning in concise bullet points."


    kwargs = {
    "modelId": "meta.llama3-1-8b-instruct-v1:0",
    "contentType": "application/json",
    "accept": "application/json",
    "body": json.dumps({
        "prompt": prompt,
        "max_gen_len": 512,
        "temperature": 0.5,
        "top_p": 0.9,
        })
    }

    response = bedrock_runtime.invoke_model(**kwargs)
    response_body = json.loads(response.get('body').read())['generation']

    print(response_body)


if __name__ == "__main__":
    main()