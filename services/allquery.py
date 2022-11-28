import self as self
from flask import jsonify, request
from flask.views import MethodView
import querycontroller.query1
from querycontroller.query2 import Query2
from querycontroller.query3 import Query3
from querycontroller.query4 import Query4
from querycontroller.query5 import Query5



class Query1API(MethodView):
    def __init__(self):
        self.q1 = querycontroller.query1.Query1()

    def get(self):
        result = self.q1.execute()
        # print(jsonify(result))
        return jsonify(result)


class Query2API(MethodView):
    def __init__(self):
        self.q2 = Query2()

    def get(self):
        result = self.q2.execute()
        # print(jsonify(result))
        return jsonify(result)


class Query3API(MethodView):
    def __init__(self):
        self.q3 = Query3()

    def get(self):
        result = self.q3.execute()
        # print(jsonify(result))
        return jsonify(result)


class Query4API(MethodView):
    def __init__(self):
        self.q4 = Query4()

    def get(self):
        result = self.q4.execute()
        # print(jsonify(result))
        return jsonify(result)


class Query5API(MethodView):
    def __init__(self):
        self.q5 = Query5()

    def get(self):
        result = self.q5.execute()
        # print(jsonify(result))
        return jsonify(result)

