"use strict";

document.observe("dom:loaded", function(){
	/* Make necessary elements Dragabble / Droppables (Hint: use $$ function to get all images).
	 * All Droppables should call 'labSelect' function on 'onDrop' event. (Hint: set revert option appropriately!)
	 * 필요한 모든 element들을 Dragabble 혹은 Droppables로 만드시오 (힌트 $$ 함수를 사용하여 모든 image들을 찾으시오).
	 * 모든 Droppables는 'onDrop' 이벤트 발생시 'labSelect' function을 부르도록 작성 하시오. (힌트: revert옵션을 적절히 지정하시오!)
	 */

	var lab_img = $$('img');

	for (var i = 0; i < lab_img.length; i++) {
		new Draggable(lab_img[i], {revert:true} );
		Droppables.add("selectpad",{onDrop:labSelect});
	}
	
});

function labSelect(drag, drop, event) {
	/* Complete this event-handler function 
	 * 이 event-handler function을 작성하시오.
	 */	
	var lab_img = $$(" #labs > img ");
	var select_img = $$(" #selectpad > img ");


	if(select_img.length<3 && drop.id == "selectpad" && drag.parentNode.getAttribute("id")=="labs"){

		var img = document.createElement("img");
		img.src = drag.getAttribute("src");
		img.alt = drag.getAttribute("alt");
		document.getElementById("labs").removeChild(drag);
	    document.getElementById("selectpad").appendChild(img);	
		new Draggable(img, {revert:true});
		Droppables.add("labs",{onDrop:labSelect});

		setTimeout( function(){
			var lab_name =  drag.getAttribute("alt");
	    	var li = document.createElement("li");
	    	li.innerHTML = lab_name;
	    	document.getElementById("selection").appendChild(li);
	    	li.pulsate({duration: 1, pulses : 2}); } , 500);
	}
    else if(drop.id == "labs" && drag.parentNode.getAttribute("id")=="selectpad"){

    	var img = document.createElement("img");
		img.src = drag.getAttribute("src");
		img.alt = drag.getAttribute("alt");
		document.getElementById("selectpad").removeChild(drag);
		document.getElementById("labs").appendChild(img);
		
		new Draggable(img, {revert:true});
		Droppables.add("selectpad",{onDrop:labSelect});

		var lab_name =  drag.getAttribute("alt");
		
		var li = $$("#selection > li");
		for(var i = 0; i<li.length; i++){
	    	if(li[i].firstChild.nodeValue == lab_name){
	    		document.getElementById("selection").removeChild(li[i]);
	    	}
	    }
    }
}

