#coding=utf-8
# author luojin 19/1/18

import random 
import sys
import os
import json
import io
from datetime import datetime 
from flask import Flask,render_template,redirect,url_for
from flask_bootstrap import Bootstrap
from flask import request
from flask_apscheduler import APScheduler
from flask import jsonify
import time
#通过flask服务器 不同机器之前发起post请求，调用接口类传输json
#代码还有个发起结构化存储文档的post请求，待补全
app = Flask(__name__)
bootstrap = Bootstrap(app)

class Config(object):
    JOBS=[
        {
            'id': 'backup',
            'func': '__main__:backup',
            'trigger': 'interval',
            'seconds': 86400
        }
    ]
    SCHEDULER_API_ENABLED = True
def backup():
    localtime= time.localtime(time.time())
    filename='backup/'+str(localtime[0])+'_'+str(localtime[1])+'_'+str(localtime[2])+'.txt'
    print(filename)
    basepath=r'./'
    readpath=r'registered.txt'
    f=open(basepath+readpath,'r',encoding='utf-8')
    fw=open(basepath+filename,'ab+')
    lines=f.readlines()
    for line in lines:
        fw.write(line.encode('UTF-8'))
    f.close()
    fw.close()



@app.route('/',methods=['GET'])
def home():
    return render_template("home.html")
@app.route('/about',methods=['GET'])
def about():
    return render_template('about.html')
@app.route('/abstarct',methods=['GET'])
def abstract():
    return render_template('abstract.html')
@app.route('/accommodation',methods=['GET'])
def accommodation():
    return render_template('accommodation.html')
@app.route('/committees',methods=['GET'])
def committees():
    return render_template('committees.html')
@app.route('/contact',methods=['GET'])
def contact():
    return render_template('contact.html')
@app.route('/invited',methods=['GET'])
def invited():
    return render_template('invited.html')
@app.route('/programs',methods=['GET'])
def programs():
    return render_template('program.html')
@app.route('/rigistration',methods=['GET'])
def rigistration():
    return render_template('rigistration.html')
@app.route('/venue',methods=['GET'])
def venue():
    return render_template('venue.html')
#这里host必须设为0,0,0,0 否则外部浏览器没法通过本机IP访问flask服务器
if __name__ == '__main__':
    app.config.from_object(Config())
    scheduler = APScheduler()
    # it is also possible to enable the API directly
    # scheduler.api_enabled = True
    scheduler.init_app(app)
    scheduler.start()
    app.run(host='0.0.0.0',port =1145,debug=True)