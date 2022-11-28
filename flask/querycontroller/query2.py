from dbconnection.dbcon import PostgresConnection
import pandas as pd


class Query2:
    def __init__(self):
        self.con = PostgresConnection().getConnection()
        print("Constructor called")

    def execute(self):
        con = PostgresConnection().getConnection()
        cur = con.cursor()
        query2 = """SELECT bill_info.MONTH,SUM(bill_info.CONSULT_FEE) 
FROM hospitals.bill_info 
GROUP BY (bill_info.MONTH) 
"""
        cur.execute(query2)
        result = cur.fetchall()[:15]
        pd_data = pd.DataFrame(list(result), columns=['month', 'total_patient'])
        # pd_data['sales'] = pd_data['sales'].astype('float64')
        pd_data = pd_data.dropna()
        # print(pd_data)
        return pd_data.to_dict(orient='records')


if __name__ == '__main__':
    q2 = Query2()
    data = q2.execute()
    print(data)
