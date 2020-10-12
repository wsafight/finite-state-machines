

var State = function(name){
  this._name = name;
  this._id = Math.random();

  this._parent = null;
}

State.prototype.clone = function(){
  return new State(this.getName());
}

State.prototype.setParent = function(parent){

  if (this._parent){
    return false;
  }

  this._parent = parent;
  return true;
}

State.prototype.removeParent = function(){
  this._parent = null;
}

State.prototype.getID = function(){
  return this._id;
}

State.prototype.getParent = function(){
  return this._parent;
}

State.prototype.getName = function(){
  return this._name;
}

export { State };