function Triangle(a, b, c) {
	this.a = a == undefined ? 0.0 : a;
	this.b = b == undefined ? 0.0 : b;
	this.c = c == undefined ? 0.0 : c;

	this.mediumAB = function () { return this.a / 2; };
	this.mediumBC = function () { return this.b / 2; };
	this.mediumAC = function () { return this.c / 2; };
	this.angleA = function () { return Math.degrees(Math.acos((b * b + c * c - a * a) / (2 * b * c))); };
	this.angleB = function () { return Math.degrees(Math.acos((a * a + c * c - b * b) / (2 * c * a))); };
	this.angleC = function () { return Math.degrees(Math.acos((b * b + a * a - c * c) / (2 * b * a))); };
	this.type = function () {
	    if (a == b == c) {
	        return "Равносторонний";
	    }
	    if (a == b || b == c || a == c) {
	        if (this.angleA() == 90 || this.angleB() == 90 || this.angleC() == 90) {
	            return "Прямоугольный равнобедренный";
	        }
	        return "Равнобедренный";
	    }

	    if (this.angleA() == 90 || this.angleB() == 90 || this.angleC() == 90) {
	        return "Прямоугольный";
	    }

	    if (this.angleA() < 90 && this.angleB() < 90 && this.angleC() < 90) {
	        return "Остроугольный";
	    }
	    if (this.angleA() > 90 || this.angleB() > 90 || this.angleC() > 90) {
	        return "Тупоугольный";
	    }
        return "Разносторонний"
	};
}

// Converts from radians to degrees.
Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};

function TriangleView(a, b, c) {
	Triangle.call(this, a, b, c);

	this.createOperationView = function(rowIndex) {
		var view = document.createDocumentFragment();
		
		var deleteButton = document.createElement("button");
		deleteButton.appendChild(document.createTextNode("Delete"));
		deleteButton.addEventListener("click", function() {
			data.deleteTriangle(rowIndex);
		});
		view.appendChild(deleteButton);

		var increaseButton = document.createElement("button");
		increaseButton.appendChild(document.createTextNode("Increase"));
		increaseButton.addEventListener("click", function () {
		    data.increaseTriangle(rowIndex);
		});
		view.appendChild(increaseButton);

		var decreaseButton = document.createElement("button");
		decreaseButton.appendChild(document.createTextNode("Decrease"));
		decreaseButton.addEventListener("click", function () {
		    data.decreaseTriangle(rowIndex);
		});
		view.appendChild(decreaseButton);

		return view;
	}

	this.createRow = function(rowIndex) {
	    var tr = document.createElement('tr');
	    tr.id = "row_" + rowIndex;

	    var td1 = document.createElement('td');
	    td1.appendChild(document.createTextNode('#' + rowIndex));
		tr.appendChild(td1);

	    var td2 = document.createElement('td');
	    td2.appendChild(document.createTextNode(this.a));
	    tr.appendChild(td2);
	    
	    var td3 = document.createElement('td');
	    td3.appendChild(document.createTextNode(this.b));
		tr.appendChild(td3);

		var td4 = document.createElement('td');
	    td4.appendChild(document.createTextNode(this.c));
		tr.appendChild(td4);

	    var td5 = document.createElement('td');
	    td5.appendChild(document.createTextNode(this.mediumAB()));
	    tr.appendChild(td5);

	    var td6 = document.createElement('td');
	    td6.appendChild(document.createTextNode(this.mediumBC()));
	    tr.appendChild(td6);

	    var td7 = document.createElement('td');
	    td7.appendChild(document.createTextNode(this.mediumAC()));
	    tr.appendChild(td7);

	    var td8 = document.createElement('td');
	    td8.appendChild(document.createTextNode(this.angleA()));
	    tr.appendChild(td8);

	    var td9 = document.createElement('td');
	    td9.appendChild(document.createTextNode(this.angleB()));
	    tr.appendChild(td9);

	    var td10 = document.createElement('td');
	    td10.appendChild(document.createTextNode(this.angleC()));
	    tr.appendChild(td10);

	    var td11 = document.createElement('td');
	    td11.appendChild(document.createTextNode(this.type()));
	    tr.appendChild(td11);

		var td12 = document.createElement('td');
	    td12.appendChild(this.createOperationView(rowIndex));
		tr.appendChild(td12);

		return tr;
	}

}

function getRandom() {
	return Math.round(Math.random()*100)+1;
}

var data = {
	triangles : [
		new TriangleView(1,2,3),
		new TriangleView(3,4,5),
		new TriangleView(10,10,10)
	],
	
	refreshTable : function() {
		var tableBody = document.getElementById('triangles');
		tableBody.innerHTML = '';
		for(var i = 0; i < this.triangles.length; ++i) {
			tableBody.appendChild(this.triangles[i].createRow(i));
		}
	},

	add : function(a, b, c) {
		this.triangles.push(new TriangleView(a, b, c));
		this.refreshTable();
	},

	addRandom: function () {
	    var a = 0, b = 0, c = 0;
	    while (a + b <= c || a + c <= b || b + c <= a) {
	        a = getRandom();
	        b = getRandom();
	        c = getRandom();
	    }
		this.add(a, b, c);
	},
  addCustomTriangle: function(){
	this.add(parseFloat(document.getElementById("SideA").value), parseFloat(document.getElementById("SideB").value),
	parseFloat(document.getElementById("SideC").value));
	
},
	
	deleteTriangle : function(index) {
		this.triangles.splice(index, 1);
		this.refreshTable();
	},

	increaseTriangle: function (index) {
	    this.triangles[index] = new TriangleView(this.triangles[index].a * 2, this.triangles[index].b * 2, this.triangles[index].c * 2);
	    this.refreshTable();
	},

	decreaseTriangle: function (index) {
	    this.triangles[index] = new TriangleView(this.triangles[index].a * 0.5, this.triangles[index].b * 0.5, this.triangles[index].c * 0.5);
	    this.refreshTable();
	},

	clear : function() {
		this.triangles = [];
		this.refreshTable();
	}
}
