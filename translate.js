var capitalAlphabet = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
var alphabet = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
var special = ['`','~','!','@','#','$','%','^','&','*','(',')','_','=',';',':',',','<','.','>','/','?',' '];
var numberDelimeters = ['_'].concat(alphabet).concat(capitalAlphabet).concat(special);
var letterDelimeters = ['0','1','2','3','4','5','6','7','8','9','-'];

function encode(input)
{
	var ret = "";
	for (var i = 0; i < input.length; i++) {
  	var character = input.charAt(i);

		//console.log(character,special.indexOf(character));
    if (special.indexOf(character)!=-1) {
			var source = Math.floor(Math.random()*special.length);
      var destination = special.indexOf(character);
      if(destination==-1) {
      	//Uh oh error!!! Just skip it!
        ret+="0?";
      }
			//Get delta
      var delta = destination-source;
      ret += delta;
      ret += special[source];
      //console.log(delta,special[destination],special[source],destination,source);
    } else if (character == character.toUpperCase()) {
    	//Select source character
    	var source = Math.floor(Math.random()*capitalAlphabet.length);
      var destination = capitalAlphabet.indexOf(character);
      if(destination==-1) {
      	//Uh oh error!!! Just skip it!
        ret+="0?";
      }
      //Get delta
      var delta = destination-source;
      ret += delta;
      ret += capitalAlphabet[source];
      //console.log(delta,capitalAlphabet[destination],capitalAlphabet[source],destination,source);
    } else if (character == character.toLowerCase()){
      //Select source character
    	var source = Math.floor(Math.random()*alphabet.length);
      var destination = alphabet.indexOf(character);
      if(destination==-1) {
      	//Uh oh error!!! Just skip it!
        ret+="0?";
      }
      //Get delta
      var delta = destination-source;
      ret += delta;
      ret += alphabet[source];
      //console.log(delta,capitalAlphabet[destination],capitalAlphabet[source],destination,source);
    }
	}
  return ret;
}

function decode(input)
{
  var ret = "";
  var numbers = splitMultiple(input,numberDelimeters);
  var letters = splitMultiple(input,letterDelimeters);
  //console.log(numbers);
  if(numbers.length!=letters.length) return "Error";
  for (var i = 0; i < letters.length; i++) {
    var character = letters[i];
    var source = -1;
    var isCapital = false;
		//console.log(special.indexOf(character));
    if (special.indexOf(character)!=-1) {
			source = special.indexOf(character);
			var delta = Number(numbers[i]);
	    var destination = source+delta; //Using communitive property
	    //console.log(delta,special[source],special[destination]);
	    ret += special[destination];
      continue;
    } else if (character == character.toUpperCase()) {
      isCapital = true;
      source = capitalAlphabet.indexOf(character);
    } else if (character == character.toLowerCase()){
      source = alphabet.indexOf(character);
    }

    if(source==-1)
    {
      ret += "?";
      continue;
    }

    var delta = Number(numbers[i]);
    var destination = source+delta; //Using communitive property
    //console.log(destination);
    if(isCapital) ret += capitalAlphabet[destination]; else ret += alphabet[destination];
  }

  return ret;
}

function splitMultiple(source,delimeters)
{
  var pieces = [];
  pieces.push(source);
  var newPieces = [];
  for (var i = 0; i < delimeters.length; i++) {
    var currentdelimeter = delimeters[i];
    for (var j = 0; j < pieces.length; j++) {
      var piecesPieces = pieces[j].split(currentdelimeter);
      for (var k = 0; k < piecesPieces.length; k++)
        newPieces.push(piecesPieces[k]);
    }
    pieces = newPieces;
    newPieces = [];
  }
  return pieces.filter(function(e){ return e === 0 || e });
}

//UI
function encodeUI()
{
  document.getElementById("encodeOut").innerText = encode(document.getElementById("encode").value);
}

function decodeUI()
{
  document.getElementById("decodeOut").innerText = decode(document.getElementById("decode").value);
}
