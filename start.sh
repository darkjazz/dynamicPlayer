open /Applications/Apache\ CouchDB.app &
sleep 0.5
FUSEKI_HOME=/usr/local/apache-jena-fuseki-2.3.1 /usr/local/apache-jena-fuseki-2.3.1/fuseki-server &
python /Users/flo/Projects/Code/FAST/dynamicPlayerAPI/dynamicservice.py &
node /Users/flo/Projects/Code/FAST/audio-server/server.js &
node ./server.js
