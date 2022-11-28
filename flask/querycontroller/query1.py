
from dbconnection.dbcon import PostgresConnection
import pandas as pd


class Query1:
    def __init__(self):
        self.con = PostgresConnection().getConnection()
        print("Constructor called")

    def execute(self):
        con = PostgresConnection().getConnection()
        cur = con.cursor()
        select_stmt = """SELECT patient_info.gender as "gender", COUNT(bill_info.appoint_no) "Visited patient" 
FROM hospitals.bill_info 
JOIN hospitals.patient_info ON PATIENT_INFO.APPOINT_NO = bill_info.appoint_no
GROUP BY (patient_info.gender) """
        cur.execute(select_stmt)
        records = cur.fetchall()
        df = pd.DataFrame(list(records), columns=['gender', 'total_patient'])
        df = df.dropna()
        df
        return df.to_dict(orient='records')


if __name__ == '__main__':
    q1 = Query1()
    data = q1.execute()
    print(data)
