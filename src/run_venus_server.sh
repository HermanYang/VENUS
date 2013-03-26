#!/bin/bash

gen="../res/models/gen"
objs="../res/models/objs"
converter="./../tools/obj_to_json_converter.js"

if [ -d $gen ] 
then
	echo "remove old gen directory"
	rm -r $gen
fi

echo "generating gen directory"
mkdir -p $gen

#convert obj models
for file in `ls $objs`
do
	if [ -f $objs"/"$file ]
	then
		fileSuffic=${file##*.}
		fileName=${file%.*}
		if [ $fileSuffic = "obj" ]
		then
			node $converter $objs"/"$file $gen"/"$fileName".js"
		else
			echo $objs"/"$file" is not an obj file"
		fi
	fi
done	

socket_io="./node_modules/socket.io"
if [ ! -d $socket_io ]
then
	echo $socket_io" is not found, now let's install"
	npm install socket_io
fi

#start venus server
node ./server/main.js
