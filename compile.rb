require 'json'

all = []

(1..16).each do |i|
 obj = JSON.parse IO.read("static/data/spot_crime_#{i}.json")
 all = all.concat obj['crimeList']
end

IO.write('static/data/spot_crime.json', JSON.dump({ crimeList: all }))
