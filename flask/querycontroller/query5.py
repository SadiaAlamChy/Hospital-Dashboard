from dbconnection.dbcon import PostgresConnection
import pandas as pd


class Query5:
    def __init__(self):
        self.con = PostgresConnection().getConnection()
        print("Constructor called")

    def execute(self):
        con = PostgresConnection().getConnection()
        cur = con.cursor()
        query5 = """SELECT patient_info.DEPARTMENT_NO,COUNT(bill_info.APPOINT_NO) 
FROM hospitals.bill_info 
JOIN hospitals.patient_info ON
bill_info.APPOINT_NO = patient_info.APPOINT_NO
GROUP BY (patient_info.DEPARTMENT_NO) """
        cur.execute(query5)
        result = cur.fetchall()
        pd_data = pd.DataFrame(list(result), columns=['DEPARTMENT_NO', 'APPOINT_NO'])
        pd_data['APPOINT_NO'] = pd_data['APPOINT_NO'].astype('float64')
        pd_data = pd_data.dropna()
        cur.execute(query5)
        # result = cur.fetchall()
        # pd_data = pd.DataFrame(list(result), columns=['district', 'Year', 'sales'])
        # pd_data['sales'] = pd_data['sales'].astype('float64')
        # pd_data = pd_data.dropna()
        # # print(pd_data)
        return pd_data.to_dict(orient='records')


if __name__ == '__main__':
    q5 = Query5()
    data = q5.execute()
    print(data)
