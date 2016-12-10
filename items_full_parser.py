import pandas as pd #import pandas
import json

df = pd.read_csv('items_full.csv') #df is a pandas dataframe containing the exercise_log csv
del df['extra_fields']
del df['remote_size']
del df['size_on_disk']
del df['total_files']
del df['youtube_id']
del df['available']
del df['parent_id']
del df['sort_order']
del df['files_complete']

#df1 = df[df.path[0:8] == "khan/math"]
#df = df.drop(df[df.path[0:8] != "khan/math"].index)
#df[df['path'][0:8].map ==  "khan/math"]
#df = df[(df["path"])[0:9] == "khan/math"]
#print(df.loc[1]["path"][0:9])

df = df[df['path'].str.startswith("khan/math") == True]



j = (df.reset_index().to_json(orient='records')) #render dataframe as json
print("JSON parsed!")
k = (json.dumps(json.loads(j), indent=2, sort_keys=True)) #format json
f = open('items_full.json' , 'w' ) #open destination file
f.write(k)
print("JSON saved!")
