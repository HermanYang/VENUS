IdGenerator = {};

IdGenerator._currentId = - 1;

IdGenerator.getUniqueId = function() {
	IdGenerator._currentId += 1;
	return IdGenerator._currentId;
};

