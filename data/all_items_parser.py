import pandas as pd #import pandas
import json

df = pd.read_csv('all_items.csv') #df is a pandas dataframe containing the all_items csv
j = (df.reset_index().to_json(orient='records')) #render dataframe as json
print("JSON parsed!")
k = (json.dumps(json.loads(j), indent=2, sort_keys=True)) #format json
f = open('all_items.json"' , 'w' ) #open destination file
f.write(k)
print("JSON saved!")