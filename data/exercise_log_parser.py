import pandas as pd #import pandas
import json

df = pd.read_csv('exercise_log.csv') #df is a pandas dataframe containing the exercise_log csv
j = (df.reset_index().to_json(orient='records')) #render dataframe as json
print("JSON parsed!")
k = (json.dumps(json.loads(j), indent=2, sort_keys=True)) #format json
f = open('exercise_log.json' , 'w' ) #open destination file
f.write(k)
print("JSON saved!")
