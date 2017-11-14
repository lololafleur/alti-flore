/**
 *	@file: custom.js
 *		Effets d'animations pour les sites clients
 **/

 // Fonction js pour afficher / cacher la recherche avancée
 function visibilite(thingId) {
	var targetElement;targetElement = document.getElementById(thingId) ;
	if (targetElement.style.display == "none")
	{targetElement.style.display = "" ;} 
	else 
	{targetElement.style.display = "none" ;}
}
 
//var delais = 3000;	//Temps d'espacement entre les effets en mili secondes
//var time = 3000;		//Temps d'execution de l'effet en mili secondes

function gestionTemporisation(fonctionAExecuter) {
	setTimeout(function(){
		 fonctionAExecuter();
	},delais);
}

/**
 *	Animation diaporama avec effet rotation
 **/


var nbimage1;			//Nombres d'images dans le diaporama
var numcurimage1 = 0;		//Numéro de l'image que l'on manipulte

function init1() {
	//On cache toutes les images ayant pour class image1
	$('.image1').hide();
	//On affiche la première image
	$('.image1:eq('+numcurimage1+')').slideDown('fast');
	nbimage1 = $('.image1').size() ;
	//Si il y a au moins 2 images, on lance l'animation
	if (nbimage1 > 1) gestionTemporisation(diaporamaType1);
}

function diaporamaType1() {
	//On cache la première image
	$('.image1:eq('+numcurimage1+')').slideUp(time);
	++numcurimage1;
	if (numcurimage1 == nbimage1) numcurimage1 = 0;
	//On affiche la suivante
	$('.image1:eq('+numcurimage1+')').slideDown(time);
	
	gestionTemporisation(diaporamaType1);
}


/**
 *	Animation diaporama effet fondu
 **/


var nbimage4;			//Nombres d'images dans le diaporama
var numcurimage4 = 0;		//Numéro de l'image que l'on manipulte
var incrementation4 = 1;

function init4() {
	//On cache toutes les images ayant pour class image4
    $('.image4:not(:first)').hide();
    $('.image4:first').css('position', 'relative');
    $('.image4:first').show();

    var parent = $('.image4:first').parent();
    if(parent.prop('tagName') != 'DIV'){
        parent = $('.image4:first').parent().parent();
    }

	// Propriétés du diaporama
	parent.css({
		//'height': $('.image4:first').height() + 'px',
		'position': 'relative',
		// 'overflow': 'hidden'
	});

	//Si il y a au moins 2 images, on lance l'animation
	if ($('.image4').size() > 1) gestionTemporisation(diaporamaType4);
}

var timeout4;
function gestionTemporisation4(fonctionAExecuter) {
    timeout4 = setTimeout(function(){
        fonctionAExecuter();
    },delais);
}

/*
function reset4(){
	clearTimeout(timeout4);
    $('.image4').stop();
    $('.image4:not(:first)').hide();
    $('.image4:not(:first)').css('opacity', 1);
    $('.image4:first').fadeIn(time/2);
	init4();
}

$(document).ready(function(){
    var timer4;
	var stopped = false;
    window.onload = resetTimer;
    document.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onmousedown = resetTimer;
    document.ontouchstart = resetTimer;
    document.onclick = resetTimer;
    document.onscroll = resetTimer;
    document.onkeypress = resetTimer;
    
    var count4 = 0;
    function timer(){
        count4++;
        if(count4 >= 60){
            stopped = true;
        }
    }
    
    function resetTimer(){
		count4 = 0;
        if(stopped){
            reset4();
            stopped = false;
        }
		clearInterval(timer4);
		timer4 = setInterval(timer, 1000);
    }
});
*/



function diaporamaType4() {
	// Récupération des deux premières images
    var prev = $('.image4:eq(0)');
    var actual = $('.image4:eq(1)');

    // On définit la taille du diapo
    actual.css("position", "absolute");
    actual.css("opacity", "1");

    // Cacher la première image
	prev.stop(true).fadeOut(time/2);

	// Afficher la seconde image
    actual.stop(true).fadeIn(time/2);

    // Placer la première image à la fin
	var parent = prev.parent();
	var element;
	if(parent.prop('tagName') == 'DIV'){
        element = prev.remove();
	} else{
		parent = prev.parent().parent();
		element = prev.parent().remove();
    }
    parent.css({'height': $('.image4:first').height() + 'px'});
    parent.append(element);
    

    // Relancer le diaporama
    
    gestionTemporisation4(diaporamaType4);
}




/**
 *	Animation diaporama avec effet carousel
 **/

sliderwidth		= 550;			// Largeur du slider (en pixels)
sliderheight	= 115;			// Hauteur du slider (en pixels)
slidespeed		= 1;				//Vitesse (entre 1 et 10)
slidebgcolor	= "transparent";		//Couleur de fond (transparent, ou #EAEAEA par exemple)
imagegap		= " " ;			//Espace entre chaque image (HTML):
slideshowgap	= 3;				// Pixels entre chaque rotation

var actualwidth='';

function init5(largeur_caroussel, hauteur_caroussel, id_name) {
	// Si la taille est précisée, on la redéfinie, sinon on utile celle par défaut
	if (largeur_caroussel)	sliderwidth = parseInt(largeur_caroussel);
	if (hauteur_caroussel)	sliderheight = parseInt(hauteur_caroussel);
		
	//On construit la structure HTML qui va accueil le diapo
	affich =	'<div style="position:relative;width:'+sliderwidth+'px;height:'+sliderheight+'px;overflow:hidden">';
	affich +=	'<div style="position:absolute;width:'+sliderwidth+'px;height:'+sliderheight+'px;background-color:'+slidebgcolor+'" onMouseover="copyspeed=0" onMouseout="copyspeed=slidespeed">';
	affich +=	'<div id="test2_slideshow" style="position:absolute;left:0px;top:0px"></div>';
	affich +=	'<div id="test3_slideshow" style="position:absolute;left:-1000px;top:0px"></div>';
	affich +=	'</div></div>';
	myslideshow = $(document.createElement('div')).attr('div', "myslideshow").append(affich);
	$('#'+id_name+'').append(myslideshow);
	
	
	//Demarrage et arret de l'animation lors du passage de la souris
	$('#test2_slideshow').mouseenter(function() {
		 clearInterval(lefttime);
	});
	$('#test3_slideshow').mouseenter(function() {
		clearInterval(lefttime);
	 });
	 $('#test2_slideshow').mouseleave(function() {
		lefttime = setInterval("slideleft()",40);
	});
	 $('#test3_slideshow').mouseleave(function() {
		lefttime = setInterval("slideleft()",40);
	 });
	 
	//On construit le code HTML de la suite d'images
	leftrightslide = '<nobr>';
	nbimage5 = $(".image5").size();
	if(nbimage5 > 1) {
		for(i=0; i < nbimage5; i++) {
			var lien = $('.image5:eq('+i+')').parent().attr('href');
			var lien_deb = '';
			var lien_fin = '';
			if (lien) { 
				lien_deb = '<a href="'+lien+'">';
				lien_fin = '</a>';
			}
			$('.image5:eq('+i+')') // Make in memory copy of image to avoid css issues
				.attr("src", $('.image5:eq('+i+')').attr("src"))
				.load(function() {
					pic_real_width = this.width;   // Note: $(this).width() will not
					pic_real_height = this.height; // work for in memory images.
					tailleTotale = parseInt((sliderheight * pic_real_width / pic_real_height) * nbimage5);
				});
				
			// On redéfinit la taille des images PROPORTIONNELLEMENT (par rapport à la hauteur du caroussel)
			var imageheight = sliderheight;
			var imagewidth = sliderheight * $('.image5:eq('+i+')').width() / $('.image5:eq('+i+')').height() ;
			leftrightslide += lien_deb + '<img src="'+ $('.image5:eq('+i+')').attr('src') +'" border="0" width="'+imagewidth+'" height="'+imageheight+'" />' + lien_fin + imagegap;
		}
	}
	leftrightslide += '</nobr>';
	
	cross_slide = $("#test2_slideshow");
	cross_slide2 = $("#test3_slideshow");
	cross_slide.append(leftrightslide);
	cross_slide2.append(leftrightslide);
	actualwidth= cross_slide.width();
	//On décale la premiere suite afin de la positionner juste après la première
	cross_slide2.css ('left', actualwidth+slideshowgap+"px");
	//On démarre l'animation
	lefttime = setInterval("slideleft()",40);

}

function slideleft() {
	//On décale la première suite
	if (parseInt(cross_slide.css('left'))>(actualwidth*(-1)+8))
		cross_slide.css( 'left' , parseInt(cross_slide.css('left')) - slidespeed+"px");
	else
		//On arrive à la fin, on la déplace juste après la seconde suite d'images
		cross_slide.css('left', parseInt(cross_slide2.css('left'))+actualwidth+slideshowgap+"px");

	//On décale la seconde suite
	if (parseInt(cross_slide2.css('left'))>(actualwidth*(-1)+8))
		cross_slide2.css('left' , parseInt(cross_slide2.css('left')) - slidespeed+"px");
	else
		//On arrive à la fin, on la déplace juste après la seconde suite d'images
		cross_slide2.css('left' ,parseInt(cross_slide.css('left'))+actualwidth+slideshowgap+"px");
}



/**
 *	Animation diaporama carousel gauche droite
 **/


var previous_image3 = 0;
var current_image3 = 0;
var next_image3 = 1;
var inPause = false; 
var inEffect = false;	// permet de locker si un effet est en cours 
var nbimages3 = 0;
var lefttime3;
function init3() 
{
	nbimages3 = $("#realisation img").size();
	//S'il y a une image, on cache toutes les images et on affiche le titre et l'image de la première'
	if($("#realisation img")) {
		$("#realisation img").hide();
		$(".titreimage").hide();
		$('#realisation img:eq('+current_image3+')').fadeIn('fast');
		$('.titreimage:eq('+current_image3+')').fadeIn('fast');
	}
	//S'il y a plus d'une image, on lance l'animation
	if(nbimages3 > 1) {
		galerie3();
	}
}

function galerie3() {
	if (inPause == false)
	lefttime3 = setTimeout(function(){
		 nextimg();
	},delais);
}


function diapopause() {
	inPause = !inPause;	 
	if (inPause == false) {
		$('#bouton_play').attr('src','/images/BOUTON-PAUSE-2.png');
		galerie3();	
	}
	else {		
		$('#bouton_play').attr('src','/images/BOUTON-PLAY-2.png');
		clearTimeout (lefttime3);
	}	
}


function nextimg() {
	if (inEffect == true) return;

	inEffect = true;
	//On cache l'image et le titre actuel et on affiche les suivants
	$('#realisation img:eq('+current_image3+')').fadeOut(time);
	if ($('.titreimage:eq('+current_image3+')') != $('.titreimage:eq('+next_image3+')') ) {
		$('.titreimage:eq('+current_image3+')').fadeOut(time);
		$('.titreimage:eq('+next_image3+')').fadeIn(time);	
	}
	
	$('#realisation img:eq('+next_image3+')').fadeIn(time, function() {
		inEffect = false;
	});	
	previous_image3 = current_image3;
	current_image3 = next_image3;
	if(next_image3 == ( nbimages3 - 1)) {
		next_image3 = 0;
	} else {
		next_image3++;
	}
	galerie3();
}

function previousimg() {
	if (inEffect == true) return;
	if ( previous_image3 == 0 && current_image3 == 0) {
		previous_image3 = nbimages3 - 1;
	}
	inEffect = true;
	//On cache l'image et le titre actuel et on affiche les precedents
	$('#realisation img:eq('+current_image3+')').fadeOut(time);
	$('.titreimage:eq('+current_image3+')').fadeOut(time);
	$('.titreimage:eq('+previous_image3+')').fadeIn(time);
	$('#realisation img:eq('+previous_image3+')').fadeIn(time, function() {
		inEffect = false;
	});	
	
	next_image3 = current_image3;
	
	if(previous_image3 == 0) {
		current_image3 = previous_image3;
		previous_image3 = nbimages3 - 1;
	} else {
		current_image3 = previous_image3;
		previous_image3--;
	}
	
	galerie3();
	
}

/*	<------------------------------------ TS : Detection de la touche du clavier appuyée
function detectTouche(e){
   var key_code = "";
 
   if(parseInt(navigator.appVersion,10) >=4){
        if(navigator.appName == 'Netscape'){ // Pour Netscape, firefox, ...
            key_code = e.which;
        }
        else{ // pour Internet Explorer
            key_code = e.keyCode;
        }
   }
 
   if(key_code == "27")
       alert("fleche de gauche");
   else if(key_code == "29")
       alert("fleche de droite");
}
-----------------------------------------------------> */
