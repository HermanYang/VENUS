assert = module.require("assert");
filesystem = module.require("fs");

if(module.require.parent === undefined){
	main();
}
else{
	console.log("yi?");
}

function convertObjToJson(objContent)
{
    vertexArray = [ ];
    normalArray = [ ];
    objContentureArray = [ ];
    indexArray = [ ];

    var vertex = [ ];
    var normal = [ ];
    var objContenture = [ ];
    var facemap = { };
    var index = 0;

    var lines = objContent.split("\n");
    for (var lineIndex in lines) {
        var line = lines[lineIndex].replace(/[ \t]+/g, " ").replace(/\s\s*$/, "");

        // ignore comments
        if (line[0] == "#")
            continue;

        var array = line.split(" ");
        if (array[0] == "v") {
            // vertex
            vertex.push(parseFloat(array[1]));
            vertex.push(parseFloat(array[2]));
            vertex.push(parseFloat(array[3]));
        }
        else if (array[0] == "vt") {
            // normal
            objContenture.push(parseFloat(array[1]));
            objContenture.push(parseFloat(array[2]));
        }
        else if (array[0] == "vn") {
            // normal
            normal.push(parseFloat(array[1]));
            normal.push(parseFloat(array[2]));
            normal.push(parseFloat(array[3]));
        }
        else if (array[0] == "f") {
            // face
            if (array.length != 4) {
                //obj.ctx.console.log("*** Error: face '"+line+"' not handled");
                continue;
            }

            for (var i = 1; i < 4; ++i) {
                if (!(array[i] in facemap)) {
                    // add a new entry to the map and arrays
                    var f = array[i].split("/");
                    var vtx, nor, tex;

                    if (f.length == 1) {
                        vtx = parseInt(f[0]) - 1;
                        nor = vtx;
                        tex = vtx;
                    }
                    else if (f.length = 3) {
                        vtx = parseInt(f[0]) - 1;
                        tex = parseInt(f[1]) - 1;
                        nor = parseInt(f[2]) - 1;
                    }
                    else {
                        //obj.ctx.console.log("*** Error: did not understand face '"+array[i]+"'");
                        return null;
                    }

                    // do the vertices
                    var x = 0;
                    var y = 0;
                    var z = 0;
                    if (vtx * 3 + 2 < vertex.length) {
                        x = vertex[vtx*3];
                        y = vertex[vtx*3+1];
                        z = vertex[vtx*3+2];
                    }
                    vertexArray.push(x);
                    vertexArray.push(y);
                    vertexArray.push(z);

                    // do the objContentures
                    x = 0;
                    y = 0;
                    if (tex * 2 + 1 < objContenture.length) {
                        x = objContenture[tex*2];
                        y = objContenture[tex*2+1];
                    }
                    objContentureArray.push(x);
                    objContentureArray.push(y);

                    // do the normals
                    x = 0;
                    y = 0;
                    z = 1;
                    if (nor * 3 + 2 < normal.length) {
                        x = normal[nor*3];
                        y = normal[nor*3+1];
                        z = normal[nor*3+2];
                    }
                    normalArray.push(x);
                    normalArray.push(y);
                    normalArray.push(z);

                    facemap[array[i]] = index++;
                }

                indexArray.push(facemap[array[i]]);
            }
        }
    }

    result = {};
    result["vertices"] = vertexArray;
    result["normals"] = normalArray;
    result["textureCoords"] = objContentureArray;
    result["indices"] = indexArray;;

	return result;
}

function main(){
	assert.equal(process.argv.length === 4, true, " need arguments");
	var inputFile = process.argv[2];
	var outputFile = process.argv[3];
	var objContent = filesystem.readFileSync(inputFile, "utf8"); 
	console.log("[converting " + inputFile + " to " + outputFile + "]");
	var json = convertObjToJson(objContent);
	var jsonContent = JSON.stringify(json);

	filesystem.writeFileSync(outputFile, jsonContent, "utf8");
};

