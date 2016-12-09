import csv  
import json  
  
# Open the CSV  
f = open( 'users.csv', 'rU' )  
# Set field names
reader = csv.DictReader( f, fieldnames = ("user_id","username"))
# Parse the CSV into JSON  
out = json.dumps( [ row for row in reader ] )  
print ("JSON parsed!")
# Save the JSON  
f = open( 'users.json', 'w')  
f.write(out)  
print ("JSON saved!")
