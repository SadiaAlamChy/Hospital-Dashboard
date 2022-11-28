import psycopg2


class PostgresConnection(object):
    def __init__(self):
        self.connection = psycopg2.connect(database="HOSPITAL",
                                           user="postgres",
                                           password="Sadia_2020",
                                           host="127.0.0.1",
                                           port="5432")

    def getConnection(self):
        print("successfully connected to database")
        return self.connection


con = PostgresConnection().getConnection()
