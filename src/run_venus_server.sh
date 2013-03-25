#!/bin/bash

gen="../res/models/gen"
objs="../res/models/objs"
generator="./../tools/obj_json_translator.py"

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
			python $generator -i $objs"/"$file -o $gen"/"$fileName".js"
		else
			echo $objs"/"$file" is not an obj file"
		fi
	fi
done	

#start venus server
node ./server/main.js
